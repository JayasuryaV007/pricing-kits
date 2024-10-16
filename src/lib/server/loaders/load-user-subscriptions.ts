import { getSignedInUserId } from '../queries';
import getSupabaseServerComponentClient from '~/core/supabase/server-component-client';

export const loadUserSubscriptions = async () => {
  const userId = await getSignedInUserId();

  const { data: userSubscriptions, error } =
    await getSupabaseServerComponentClient()
      // .from('user_subscriptions')
      // .select()
      // .eq('user_id', userId);

      .from('user_subscriptions')
      .select(
        `
        id,
        user_id,
        service_name,
        service_url,
        plan_name,
        price,
        billing_cycle,
        paid_date,
        start_date,
        status,
        type,
        created_at,
        next_billing_date
      `
    )
      .order('created_at', { ascending: true })
      .eq('user_id', userId);

  if (error) {
    console.log(error);
    return [];
  }
  //console.log(userSubscriptions, 'HHHHHHHHHHHHHHHHHHHHHHHHHHHHHH');
  //return userSubscriptions;
  if (!error) {
    const distinctSubscriptions = Array.from(
      new Map(
        userSubscriptions.map((item) => [item.service_name, item]),
      ).values(),
    );
   // console.log(distinctSubscriptions, 'distinctSubscriptions');
    return distinctSubscriptions;
  }
  return [];
};
