'use server';

import { z } from 'zod';
import { join } from 'path';
import type { SupabaseClient } from '@supabase/supabase-js';

import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { RedirectType } from 'next/dist/client/components/redirect';

import getLogger from '~/core/logger';
import getApiRefererPath from '~/core/generic/get-api-referer-path';

import createStripeCheckout from '~/lib/stripe/create-checkout';

import requireSession from '~/lib/user/require-session';

import configuration from '~/configuration';
import createBillingPortalSession from '~/lib/stripe/create-billing-portal-session';
import { withSession } from '~/core/generic/actions-utils';
import getSupabaseServerActionClient from '~/core/supabase/action-client';

export const createCheckoutAction = withSession(
  async (_, formData: FormData) => {
    const logger = getLogger();

    const bodyResult = await getCheckoutBodySchema().safeParseAsync(
      Object.fromEntries(formData),
    );

    const redirectToErrorPage = (error?: string) => {
      console.log('error', error);
      const referer = getApiRefererPath(headers());
      const url = join(referer, `?error=true`);

      logger.error({ error }, `Could not create Stripe Checkout session`);

      return redirect(url);
    };

    // Validate the body schema
    if (!bodyResult.success) {
      console.log(bodyResult.error);
      console.log(formData);
      return redirectToErrorPage(`Invalid request body`);
    }

    const { userId, priceId, returnUrl, email } = bodyResult.data;
    console.log(email);
    // create the Supabase client
    // const client = getSupabaseServerActionClient();

    // require the user to be logged in
    // const sessionResult = await requireSession(client);
    // const userId = sessionResult.user.id;
    const customerEmail = email;

    // const { error, data } = await getOrganizationByUid(client, organizationUid);

    // if (error) {
    //   return redirectToErrorPage(`Organization not found`);
    // }

    // const customerId = data?.subscription?.customerId;

    // if (customerId) {
    //   logger.info({ customerId }, `Customer ID found for organization`);
    // }

    const plan = getPlanByPriceId(priceId);

    // check if the plan exists in the configuration.
    if (!plan) {
      console.warn(
        `Plan not found for price ID "${priceId}". Did you forget to add it to the configuration? If the Price ID is incorrect, the checkout will be rejected. Please check the Stripe dashboard`,
      );
    }

    // check the user's role has access to the checkout
    const canChangeBilling = await getUserCanAccessCheckout({
      // organizationUid,
      userId,
    });

    // disallow if the user doesn't have permissions to change
    // billing settings based on its role. To change the logic, please update
    // {@link canChangeBilling}
    if (!canChangeBilling) {
      logger.debug(
        {
          userId,
          // organizationUid,
        },
        `User attempted to access checkout but lacked permissions`,
      );

      return redirectToErrorPage(
        `You do not have permission to access this page`,
      );
    }

    const trialPeriodDays =
      plan && 'trialPeriodDays' in plan
        ? (plan.trialPeriodDays as number)
        : undefined;

    const embedded = configuration.stripe.embedded;

    // create the Stripe Checkout session
    const session = await createStripeCheckout({
      returnUrl,
      // organizationUid,
      userId,
      priceId,
      // customerId,
      trialPeriodDays,
      customerEmail,
      embedded,
    }).catch((e) => {
      logger.error(e, `Stripe Checkout error`);
    });

    // if there was an error, redirect to the error page
    if (!session) {
      return redirectToErrorPage();
    }

    logger.info(
      {
        id: session.id,
        // organizationUid,
      },
      `Created Stripe Checkout session`,
    );

    // if the checkout is embedded, we need to render the checkout
    // therefore, we send the clientSecret back to the client
    if (embedded) {
      logger.info(
        { id: session.id },
        `Using embedded checkout mode. Sending client secret back to client.`,
      );

      return {
        clientSecret: session.client_secret,
      };
    }

    // retrieve the Checkout Portal URL
    if (!session.url) {
      logger.error(
        { id: session.id },
        `Could not retrieve Stripe Checkout URL`,
      );

      return redirectToErrorPage();
    }

    // redirect user back based on the response
    return redirect(session.url, RedirectType.replace);
  },
);

/**
 * @name getUserCanAccessCheckout
 * @description check if the user has permissions to access the checkout
 * @param client
 * @param params
 */
async function getUserCanAccessCheckout(
  // client: SupabaseClient,
  params: {
    // organizationUid: string;
    userId: string;
  },
) {
  try {
    // const { role } = await getUserMembershipByOrganization(client, params);
    // if (role === undefined) {
    //   return false;
    // }
    // return canChangeBilling(role);
    return true;
  } catch (error) {
    getLogger().error({ error }, `Could not retrieve user role`);

    return false;
  }
}

export const createBillingPortalSessionAction = withSession(
  async (formData: FormData) => {
    const body = Object.fromEntries(formData);
    const bodyResult = await getBillingPortalBodySchema().safeParseAsync(body);
    const referrerPath = getApiRefererPath(headers());

    // Validate the body schema
    if (!bodyResult.success) {
      return redirectToErrorPage(referrerPath);
    }

    const { customerId } = bodyResult.data;

    // const client = getSupabaseServerActionClient();
    const logger = getLogger();
    // const session = await requireSession(client);

    const userId = customerId;

    // get permissions to see if the user can access the portal
    const canAccess = await getUserCanAccessCustomerPortal({
      customerId,
      userId,
    });

    // validate that the user can access the portal
    if (!canAccess) {
      return redirectToErrorPage(referrerPath);
    }

    const referer = headers().get('referer');
    const origin = headers().get('origin');
    const returnUrl = referer || origin || configuration.paths.appHome;

    // get the Stripe Billing Portal session
    const { url } = await createBillingPortalSession({
      returnUrl,
      customerId,
    }).catch((e) => {
      logger.error(e, `Stripe Billing Portal redirect error`);

      return redirectToErrorPage(referrerPath);
    });

    // redirect to the Stripe Billing Portal
    return redirect(url, RedirectType.replace);
  },
);

/**
 * @name getUserCanAccessCustomerPortal
 * @description Returns whether a user {@link userId} has access to the
 * Stripe portal of an organization with customer ID {@link customerId}
 */
async function getUserCanAccessCustomerPortal(
  // client: SupabaseClient,/
  params: {
    customerId: string;
    userId: string;
  },
) {
  const logger = getLogger();

  // const { data: organization, error } = await getOrganizationByCustomerId(
  //   client,
  //   params.customerId,
  // );

  // if (error) {
  //   logger.error(
  //     {
  //       error,
  //       customerId: params.customerId,
  //     },
  //     `Could not retrieve organization by Customer ID`,
  //   );

  //   return false;
  // }

  try {
    // const organizationUid = organization.uuid;
    // const { role } = await getUserMembershipByOrganization(client, {
    //   organizationUid,
    //   userId: params.userId,
    // });
    // if (role === undefined) {
    //   return false;
    // }
    // return canChangeBilling(role);
  } catch (error) {
    logger.error({ error }, `Could not retrieve user role`);

    return false;
  }
}

function getBillingPortalBodySchema() {
  return z.object({
    customerId: z.string().min(1),
  });
}

function getCheckoutBodySchema() {
  return z.object({
    userId: z.string(),
    email: z.string(),
    priceId: z.string().min(1),
    returnUrl: z.string().min(1),
  });
}

function getPlanByPriceId(priceId: string) {
  const products = configuration.stripe.products;

  type Plan = (typeof products)[0]['plans'][0];

  return products.reduce<Maybe<Plan>>((acc, product) => {
    if (acc) {
      return acc;
    }

    return product.plans.find(({ stripePriceId }) => stripePriceId === priceId);
  }, undefined);
}

function redirectToErrorPage(referrerPath: string) {
  const url = join(referrerPath, `?error=true`);

  return redirect(url);
}
