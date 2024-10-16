// import type { SupabaseClient } from '@supabase/supabase-js';
// import type { Database } from '../../../database.types';
// import type AppConfig from '~/lib/app_configs/database/mutations';
// import { APP_CONFIGS_TABLE } from '~/lib/db-tables';
 
// type Client = SupabaseClient<Database>;
 
// export function createAppConfig(client: Client, app: Omit<AppConfig, 'id'>) {
//   return client.from(APP_CONFIGS_TABLE).insert({
//     slack_notification: app.slack_notification,
//     email_notification: app.email_notification,
//     calendar_notification: app.calendar_notification,
//     created_at: app.created_at,
//     updated_at: app.updated_at,
//     created_by: app.created_by,
//     updated_by: app.updated_by,
//   });
// }

import type { SupabaseClient } from '@supabase/supabase-js';
import type AppConfig from '~/core/session/types/app-config-request';
import { APP_CONFIGS_TABLE } from '~/lib/db-tables';

/**
 * @name updateUserData
 * @param client
 * @param id
 * @param data
 */
export function updateAppConfig(
  client: SupabaseClient,
  { id, ...data }: WithId<Partial<AppConfig>>,
) {
  return client
    .from(APP_CONFIGS_TABLE)
    .update({
        slack_notification: data.slack_notification,
        email_notification: data.email_notification,
        calendar_notification: data.calendar_notification,
        webhook_url: data.webhook_url,
        event_title: data.event_title,
        event_time: data.event_time,
        updated_at: data.updated_at,
        updated_by: data.updated_by,
      // display_name: data.displayName,
      // photo_url: data.photoUrl,
      // credits: data.credits,
    })
    .match({ id })
    .throwOnError();
}
