import 'server-only';

import { cache } from 'react';
import { redirect } from 'next/navigation';

import {
  isRedirectError,
  getURLFromRedirectError,
} from 'next/dist/client/components/redirect';

import getUIStateCookies from '~/lib/server/loaders/utils/get-ui-state-cookies';
import { getUserDataById } from '../queries';

import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import requireSession from '~/lib/user/require-session';
import getLogger from '~/core/logger';

import configuration from '~/configuration';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import { getCookie } from '~/core/generic/cookies';

/**
 * @name loadAppData
 * @description This function is responsible for loading the application data
 * from the server-side, used in the (app) layout. The data is cached for
 * the request lifetime, which allows you to call the same across layouts.
 */
const loadAppData = cache(async () => {
  const logger = getLogger();

  try {
    // console.log('token', token);
    const { language } = await initializeServerI18n(getLanguageCookie());

    return {
      language,
      ui: getUIStateCookies(),
    };
    //   const client = getSupabaseServerComponentClient();
    //   const session = await requireSession(client);
    //   const user = session.user;
    //   const userId = user.id;
    //   // we fetch the user record from the Database
    //   // which is a separate object from the auth metadata
    //   const [userRecord] = await Promise.all([getUserDataById(client, userId)]);
    //   if (!userRecord) {
    //     logger.info(
    //       {
    //         name: 'loadAppData',
    //         userId,
    //       },
    //       `User record not found in the database. Redirecting to onboarding...`,
    //     );
    //     return redirectToOnboarding();
    //   }
    //   // we initialize the i18n server-side
    //   const { language } = await initializeServerI18n(getLanguageCookie());
    //   return {
    //     language,
    //     auth: {
    //       accessToken: session.access_token,
    //       user: {
    //         id: user.id,
    //         email: user.email,
    //         phone: user.phone,
    //       },
    //     },
    //     user: userRecord,
    //     ui: getUIStateCookies(),
    //   };
  } catch (error) {
    //   // if the error is a redirect error, we simply redirect the user
    //   // to the destination URL extracted from the error
    // if (isRedirectError(error)) {
    //   const url = getURLFromRedirectError(error);
    //   return redirect(url);
    // }
    logger.warn(
      {
        name: 'loadAppData',
        error: JSON.stringify(error),
      },
      `Could not load application data`,
    );
    //   // in case of any error, we redirect the user to the home page
    //   // to avoid any potential infinite loop
    console.log('error:', error);
    return redirectToHomePage();
    // return;
  }
});

function redirectToOnboarding() {
  return redirect(configuration.paths.signUp);
}

function redirectToHomePage() {
  return redirect('/dashboard');
}

export default loadAppData;
