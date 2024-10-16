import {
  CreditCardIcon,
  Squares2X2Icon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import configuration from '~/configuration';

type Divider = {
  divider: true;
};

type NavigationItemLink = {
  label: string;
  path: string;
  Icon: (props: { className: string }) => JSX.Element;
  end?: boolean;
};

type NavigationGroup = {
  label: string;
  collapsible?: boolean;
  collapsed?: boolean;
  children: NavigationItemLink[];
};

type NavigationItem = NavigationItemLink | NavigationGroup | Divider;

type NavigationConfig = {
  items: NavigationItem[];
};

const paths = configuration.paths.settings;

const NAVIGATION_CONFIG = (user: string): NavigationConfig => ({
  items: [
    {
      label: 'common:dashboardTabLabel',
      path: '/dashboard',
      Icon: ({ className }: { className: string }) => {
        return <Squares2X2Icon className={className} />;
      },
      end: true,
    },
    {
      label: 'common:subscriptionSettingsTabLabel',
      path: '/settings/subscriptions',
      Icon: ({ className }: { className: string }) => {
        return <CreditCardIcon className={className} />;
      },
    },
    // {
    //   label: 'common:settingsTabLabel',
    //   collapsible: false,
    //   children: [
    //     // {
    //     //   label: 'common:profileSettingsTabLabel',
    //     //   path: '/settings/integrations',

    //     //   Icon: ({ className }: { className: string }) => {
    //     //     return <UserIcon className={className} />;
    //     //   },
    //     // },
    //     {
    //       label: 'common:subscriptionSettingsTabLabel',
    //       path: '/settings/subscriptions',
    //       Icon: ({ className }: { className: string }) => {
    //         return <CreditCardIcon className={className} />;
    //       },
    //     },
    //   ],
    // },
  ],
});

export default NAVIGATION_CONFIG;

function getPath(organizationId: string, path: string) {
  const appPrefix = configuration.paths.appPrefix;

  return [appPrefix, organizationId, path].filter(Boolean).join('/');
}
