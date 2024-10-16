import useMutation from 'swr/mutation';
import useSupabase from './use-supabase';

interface Credentials {
  id: string;
  user_id: string;
  service_name: string;
  service_url?: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

/**
 * @name useEditSubscription
 */
function useEditSubscription() {
  const client = useSupabase();
  const key = ['subscription', 'edit-subscription'];

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: Credentials }) => {
      const { data, error } = await client
        .from('user_subscriptions')
        .update(credentials)
        .eq('id', credentials.id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  );
}

export default useEditSubscription;
