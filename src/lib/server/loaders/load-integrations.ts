import { getSignedInUserId } from '../queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

export const loadIntegrations = async () => {
  const userId = await getSignedInUserId();

  const { data: integrations, error } = await getSupabaseServerComponentClient()
    .from('app_configs')
    .select()
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    console.log(error);
    return null;
  }

  return integrations;
};
