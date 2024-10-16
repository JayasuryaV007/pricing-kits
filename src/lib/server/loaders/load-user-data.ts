import 'server-only';

import { getUserDataById } from '~/lib/server/queries';
import initializeServerI18n from '~/i18n/i18n.server';
import getLanguageCookie from '~/i18n/get-language-cookie';
import useSupabase from '~/core/hooks/use-supabase';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

/**
 * @name loadUserData
 * @description Loads the user's data from Supabase Auth and Database.
 * This is used in the (site) layout to display the user's name and avatar.
 */
interface DataType {
  user_id: string;
  service_name: string;
}

async function loadUserData() {
  // const client = getSupabaseServerComponentClient();

  try {
    //   const { data, error } = await client.auth.getSession();

    //   // const insertUserData = {
    //   //   user_id:data.session ? data.session.user.id : '',
    //   //   email: data.session ? data.session.user.email : '',
    //   // };

    //   // await client
    //   // .from('users')
    //   // .insert([insertUserData]);
    //   let userID = data.session ? data.session.user.id : '';

    //   if (userID) {
    //     const { data: existingUser } = await client
    //       .from('users')
    //       .select()
    //       .eq('user_id', userID)
    //       .maybeSingle();

    //     if (!existingUser) {
    //       const { data: data1, error } = await client.from('users').insert({
    //         user_id: userID,
    //         email: data.session?.user.email ?? '',
    //         password_hash: '',
    //       });

    //       const appConfigsData = {
    //         slack_notification: false,
    //         email_notification: false,
    //         calendar_notification: false,
    //         webhook_url: '',
    //         event_title: null,
    //         event_time: null,
    //         created_by: data.session?.user.email ?? '',
    //         updated_by: data.session?.user.email ?? '',
    //         user_id: userID,
    //       };

    //       const { data: existingData } = await client
    //         .from('app_configs')
    //         .select()
    //         .eq('user_id', userID)
    //         .maybeSingle();

    //       if (!existingData) {
    //         const { data: data2, error: error1 } = await client
    //           .from('app_configs')
    //           .insert(appConfigsData);
    //       }
    //     }
    //   }
    //   // } else {
    //   //   throw new Error('Invalid User ID');
    //   // }

    //   if (error) {
    //     throw new Error(error.message);
    //   }

    //   if (!data.session || error) {
    //     return emptyUserData();
    //   }

    //   const session = data.session;
    //   const userId = session.user.id;
    //   const userData = await getUserDataById(client, userId);
    const language = await getLanguage();

    return {
      // session: {
      //   auth: {
      //     accessToken: session.access_token,
      //     user: {
      //       id: session.user.id,
      //       email: session.user.email,
      //     },
      //   },
      //   data: userData || undefined,
      // },
      language,
    };
  } catch (e) {
    console.log('error', e);
    return emptyUserData();
  }
}

async function emptyUserData() {
  const language = await getLanguage();

  return {
    accessToken: undefined,
    language,
    session: undefined,
  };
}

export default loadUserData;

async function getLanguage() {
  const { language } = await initializeServerI18n(getLanguageCookie());

  return language;
}
