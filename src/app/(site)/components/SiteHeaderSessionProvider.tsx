'use client';

import { useEffect, useState } from 'react';

import SiteHeader from '~/app/(site)/components/SiteHeader';
import UserSessionContext from '~/core/session/contexts/user-session';
import UserSession from '~/core/session/types/user-session';
import AuthChangeListener from '~/components/AuthChangeListener';
import { decodeToken } from '~/lib/jwt/jwt';

function SiteHeaderSessionProvider() {
  const [userSession, setUserSession] = useState<UserSession>();
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      setAccessToken(authToken);
      const decoded = decodeToken(authToken);
      if (decoded) {
        const updatedData = {
          auth: decoded,
          data: decoded.user,
        };
        setUserSession(updatedData);
      }
    }
  }, []);

  return (
    <UserSessionContext.Provider value={{ userSession, setUserSession }}>
      <AuthChangeListener accessToken={accessToken || ''}>
        <SiteHeader />
      </AuthChangeListener>
    </UserSessionContext.Provider>
  );
}

export default SiteHeaderSessionProvider;
