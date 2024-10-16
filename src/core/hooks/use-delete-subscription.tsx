import useMutation from 'swr/mutation';
import useSupabase from './use-supabase';

interface Credentials {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

/**
 * @name useDeleteSubscription
 */
function useDeleteSubscription() {
  const client = useSupabase();
  const key = ['subscription', 'delete-subscription'];

  return useMutation(
    key,
    async (_, { arg: credentials }: { arg: Credentials }) => {
      const { data, error } = await client
        .from('user_subscriptions')
        .delete()
        .eq('id', credentials.id);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  );
}

export default useDeleteSubscription;
