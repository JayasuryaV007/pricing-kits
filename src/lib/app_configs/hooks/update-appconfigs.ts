import useMutation from 'swr/mutation';

import type AppConfig from '~/core/session/types/app-config-request';
import { updateAppConfig } from '~/lib/app_configs/database/mutations';
import useSupabase from '~/core/hooks/use-supabase';

type Payload = WithId<Partial<AppConfig>>;

/**
 * @name useUpdateProfile
 */
function useAppConfig() {
  const client = useSupabase();
  const key = 'useAppConfig';

  return useMutation(key, async (_, { arg: data }: { arg: Payload }) => {
    return updateAppConfig(client, data);
  });
}

export default useAppConfig;
