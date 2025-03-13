import type { Provider } from '@supabase/supabase-js';
import { StripeCheckoutDisplayMode } from '~/lib/stripe/types';

const production = process.env.NODE_ENV === 'production';

enum Themes {
  Light = 'light',
  Dark = 'dark',
}

const configuration = {
  site: {
    name: 'Pricing Flows',
    description: 'Pricing Flows',
    themeColor: '#ffffff',
    themeColorDark: '#0a0a0a',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Awesomely',
    twitterHandle: '',
    githubHandle: '',
    convertKitFormId: '',
    locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  },
  auth: {
    // ensure this is the same as your Supabase project. By default - it's true
    requireEmailConfirmation:
      process.env.NEXT_PUBLIC_REQUIRE_EMAIL_CONFIRMATION === 'true',
    // NB: Enable the providers below in the Supabase Console
    // in your production project
    providers: {
      emailPassword: true,
      phoneNumber: false,
      emailLink: false,
      emailOtp: false,
      oAuth: ['google'] as Provider[],
    },
  },
  production,
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
  theme: Themes.Light,
  features: {
    enableThemeSwitcher: true,
    enableAccountDeletion: getBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ACCOUNT_DELETION,
      false,
    ),
    enableOrganizationDeletion: getBoolean(
      process.env.NEXT_PUBLIC_ENABLE_ORGANIZATION_DELETION,
      false,
    ),
  },
  paths: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    signInMfa: '/auth/verify',
    onboarding: `/onboarding`,
    appPrefix: '/dashboard',
    appHome: '/dashboard',
    authCallback: '/auth/callback',
    settings: {
      profile: 'settings/profile',
      organization: 'settings/organization',
      subscription: 'settings/subscription',
      authentication: 'settings/profile/authentication',
      email: 'settings/profile/email',
      password: 'settings/profile/password',
    },
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  stripe: {
    embedded: false,
    displayMode: StripeCheckoutDisplayMode.Popup,
    products: [
      {
        name: 'Starter',
        description: 'Description of your Basic plan',
        badge: `Popular`,
        features: [
          'Up to 3 Pricing Pages',
          'Unlimited Tooltips',
          'Sales Analytics (Coming Soon)',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$7',
            stripePriceId: 'price_1QWk1UDdqcz8yRjhJTdXzufi',
          },
        ],
      },
      {
        name: 'Pro',
        badge: `Most Popular`,
        recommended: true,
        description: 'Description of your Pro plan',
        features: [
          'Unlimited Pricing Pages',
          'Unlimited Tooltips',
          'Sales Analytics (Coming Soon)',
        ],
        plans: [
          {
            name: 'Monthly',
            price: '$19',
            stripePriceId: 'price_1QWk27Ddqcz8yRjhFLnsUl4N',
          },
        ],
      },
      // {
      //   name: 'Premium',
      //   description: 'Description of your Premium plan',
      //   badge: ``,
      //   features: [
      //     'Advanced Plan',
      //     // 'Unlimited users',
      //     // '50GB for each user',
      //     // 'Account Manager',
      //   ],
      //   plans: [
      //     {
      //       name: '',
      //       price: 'Contact us',
      //       stripePriceId: '',
      //       label: `Contact us`,
      //       // href: `/contact`,
      //     },
      //   ],
      // },
    ],
  },
  openai: {
    model: 'gpt-4o',
    // model: 'llama-3.1-8b-instruct',
  },
};

export default configuration;

// Validate Stripe configuration
// as this is a new requirement, we throw an error if the key is not defined
// in the environment
if (
  configuration.stripe.embedded &&
  production &&
  !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
) {
  throw new Error(
    'The key NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined. Please add it to your environment variables.',
  );
}

function getBoolean(value: unknown, defaultValue: boolean) {
  if (typeof value === 'string') {
    return value === 'true';
  }

  return defaultValue;
}
