import { getSignedInUserId } from '../queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

export const loadUserSubscriptionService = async (service_name: string) => {
 let spaceServiceName = service_name.replace('%20',' ')
  const { data: userSubscriptions, error } = await getSupabaseServerComponentClient()
      .from('user_subscriptions')
      .select()
      .eq('service_name',spaceServiceName);

  if (error) {
    console.log(error);

    return [];
  }

  return userSubscriptions;
};
