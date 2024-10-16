import React, { useContext } from 'react';

import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from '@heroicons/react/24/outline';

import classNames from 'clsx';

import Sidebar, { SidebarContent } from '~/core/ui/Sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/core/ui/Tooltip';

import Trans from '~/core/ui/Trans';
import SidebarContext from '~/lib/contexts/sidebar';
import ProfileDropdown from '~/components/ProfileDropdown';
import useUserSession from '~/core/hooks/use-user-session';
import useSignOut from '~/core/hooks/use-sign-out';

import AppSidebarNavigation from './AppSidebarNavigation';
import Navbar from './Common/Navbar';

const AppSidebar: React.FC<{
  userId: string;
}> = ({ userId }) => {
  const ctx = useContext(SidebarContext);

  return (
    <Navbar>
      <div className={'my-0 flex-grow'}>
        <span className="font-bold text-sky-800 text-lg mx-auto dark:text-white">
          Pricing Kits
        </span>{' '}
      </div>

      <div className={`flex gap-6 mx-auto flex-grow`}>
        <AppSidebarNavigation user={userId} />
      </div>

      <div className={'ml-auto'}>
        <div>
          <ProfileDropdownContainer collapsed={ctx.collapsed} />
        </div>
      </div>
    </Navbar>
  );
};

export default AppSidebar;

function AppSidebarFooterMenu() {
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  return <CollapsibleButton collapsed={collapsed} onClick={setCollapsed} />;
}

function CollapsibleButton({
  collapsed,
  onClick,
}: React.PropsWithChildren<{
  collapsed: boolean;
  onClick: (collapsed: boolean) => void;
}>) {
  const className = classNames(
    `bg-background absolute -right-[10.5px] bottom-4 cursor-pointer block`,
  );

  const iconClassName =
    'bg-background text-gray-300 dark:text-gray-600 h-5 w-5';

  return (
    <Tooltip>
      <TooltipTrigger
        className={className}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        onClick={() => onClick(!collapsed)}
      >
        <ArrowRightCircleIcon
          className={classNames(iconClassName, {
            hidden: !collapsed,
          })}
        />

        <ArrowLeftCircleIcon
          className={classNames(iconClassName, {
            hidden: collapsed,
          })}
        />
      </TooltipTrigger>

      <TooltipContent sideOffset={20}>
        <Trans
          i18nKey={
            collapsed ? 'common:expandSidebar' : 'common:collapseSidebar'
          }
        />
      </TooltipContent>
    </Tooltip>
  );
}

function ProfileDropdownContainer(props: { collapsed: boolean }) {
  const userSession = useUserSession();
  const signOut = useSignOut();

  return (
    <div className={props.collapsed ? '' : 'w-full'}>
      {/* <StatusBadge /> */}

      <ProfileDropdown
        displayName={!props.collapsed}
        className={'w-full'}
        userSession={userSession}
        signOutRequested={signOut}
      />

      <AppSidebarFooterMenu />
    </div>
  );
}

// function StatusBadge() {
//   const organization = useCurrentOrganization();
//   const subscription = organization?.subscription?.data;

//   const isActive = ['active', 'trialing'].includes(
//     subscription?.status ?? 'free',
//   );

//   // if the organization has an active subscription
//   // we do not show the subscription status badge
//   if (isActive || !subscription) {
//     return null;
//   }

//   const appPrefix = configuration.paths.appPrefix;
//   const href = `/${appPrefix}/${organization?.uuid}/settings/subscription`;

//   // in all other cases we show the subscription status badge
//   // which will show the subscription status and a link to the subscription page
//   return (
//     <Link href={href}>
//       <SubscriptionStatusBadge subscription={subscription} />
//     </Link>
//   );
// }
