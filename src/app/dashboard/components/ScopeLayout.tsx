'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import useCollapsible from '~/core/hooks/use-sidebar-state';
import AppSidebar from '~/app/dashboard/components/AppSidebar';
import Toaster from '~/components/Toaster';
import SentryBrowserWrapper from '~/components/SentryProvider';

import UserSession from '~/core/session/types/user-session';

import SidebarContext from '~/lib/contexts/sidebar';
import UserSessionContext from '~/core/session/contexts/user-session';
import I18nProvider from '~/i18n/I18nProvider';

import { setCookie } from '~/core/generic/cookies';
import AuthChangeListener from '~/components/AuthChangeListener';
import type loadAppData from '~/lib/server/loaders/load-app-data';
import { Page } from '~/core/ui/Page';
import { cva } from 'cva';
import { decodeToken } from '~/lib/jwt/jwt';
import { redirect } from 'next/navigation';

const OrganizationScopeLayout: React.FCC<{
  data: Awaited<ReturnType<typeof loadAppData>>;
}> = ({ data, children }) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = decodeToken(token);
      console.log(decoded);
      setUserData(decoded);
    } else {
      redirect('/auth/sign-in');
    }
  }, []);

  const userSessionContext: UserSession = useMemo(() => {
    return {
      auth: userData,
      data: userData?.user ?? undefined,
    };
  }, [userData]);

  const [userSession, setUserSession] =
    useState<Maybe<UserSession>>(userSessionContext);

  const updateCurrentSession = useCallback(() => {
    const cookieName = `${userSession?.data?._id}`;

    if (userSession?.data?._id) {
      setCookie(cookieName, userSession?.data?._id.toString());
    }
  }, [userSession]);

  const updateCurrentUser = useCallback(() => {
    if (userSessionContext.auth) {
      setUserSession(userSessionContext);
    }
  }, [userSessionContext]);

  useEffect(updateCurrentSession, [updateCurrentSession]);
  useEffect(updateCurrentUser, [updateCurrentUser]);

  return (
    <SentryBrowserWrapper>
      <UserSessionContext.Provider value={{ userSession, setUserSession }}>
        <I18nProvider lang={data.language}>
          {/* <AuthChangeListener
            accessToken={userData?.auth.accessToken}
            whenSignedOut={'/'}
          > */}
          <main>
            <Toaster richColors={false} />

            <RouteShellWithSidebar
              user={userSession?.data?._id ?? ''}
              collapsed={data.ui.sidebarState === 'collapsed'}
            >
              {children}
            </RouteShellWithSidebar>
          </main>
          {/* </AuthChangeListener> */}
        </I18nProvider>
      </UserSessionContext.Provider>
    </SentryBrowserWrapper>
  );
};

export default OrganizationScopeLayout;

function RouteShellWithSidebar(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    user: string;
  }>,
) {
  const [collapsed, setCollapsed] = useCollapsible(props.collapsed);
  // const className = getClassNameBuilder()({ collapsed });

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <Page
        // contentContainerClassName={className}
        sidebar={<AppSidebar userId={props.user} />}
      >
        {props.children}
      </Page>
    </SidebarContext.Provider>
  );
}

function getClassNameBuilder() {
  return cva(
    ['ml-0 transition-[margin] duration-300 motion-reduce:transition-none'],
    {
      variants: {
        collapsed: {
          true: 'lg:ml-[6rem]',
          false: 'lg:ml-[17rem]',
        },
      },
    },
  );
}
