import type { SupabaseClient } from '@supabase/supabase-js';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';
import { Database } from '~/database.types';
import requireSession from '../user/require-session';
import { APP_CONFIGS_TABLE, USERS_TABLE } from '../db-tables';

/**
 * @description Fetch user object data (not auth!) by ID {@link userId}
 */
export async function getUserDataById(
  client: SupabaseClient<Database>,
  userId: string,
) {
  const result = await client
    .from('users')
    .select(
      `
      user_id,
      email
    `,
    )
    .eq('user_id', userId)
    .maybeSingle();

  if (result.error) {
    throw result.error;
  }
  let userData;

  const { data: subscription } = await client
    .from('subscriptions')
    .select()
    .eq('user_id', userId)
    .maybeSingle();

  userData = { ...result.data, subscription };

  return userData;
}

export async function getSignedInUser() {
  try {
    const client = getSupabaseServerComponentClient();
    const session = await requireSession(client);

    return session.user;
  } catch (e) {
    throw new Error('Unauthorized');
  }
}

export async function getSignedInUserId() {
  const user = await getSignedInUser();
  return user.id;
}

// export async function loadAppConfigs(
// ) {
//   const client = getSupabaseServerComponentClient();
//   console.log("HHHHHHHHHHHHHHH")
//   //const client = getSupabaseServerComponentClient()
//   //const client = getSupabaseServerComponentClient();
//   const data = await client
//   .from(APP_CONFIGS_TABLE)
//   .select('*');  // This will return a single object or `null` if no rows are found

//   console.log("Data", data)

//   console.log('Data fetched from app_configs:', data);
//   return data;
// };
