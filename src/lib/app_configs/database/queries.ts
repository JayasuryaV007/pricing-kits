import type { SupabaseClient } from '@supabase/supabase-js';
import { APP_CONFIGS_TABLE } from '~/lib/db-tables';

/**
 * @name getAppConfig
 * @param client
 */
export function getAppConfig(client: SupabaseClient) {
  return client
    .from(APP_CONFIGS_TABLE)
    .select('*')
    .maybeSingle();
}
