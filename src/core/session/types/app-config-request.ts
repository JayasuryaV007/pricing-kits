import { Database } from '~/database.types';

/**
 * This interface represents the user record in the Database
 * Not to be confused with {@link User} defined in Supabase Auth
 * This data is always present in {@link UserSession}
 */
interface AppConfig {
  id: number;
  slack_notification?: boolean;
  email_notification?: boolean;
  calendar_notification?: boolean;
  webhook_url?: string;
  event_title?: string;
  event_time?: string;
  created_at?: string | Date;
  updated_at?: string | Date;
  created_by?: string;
  updated_by?: string;
  // credits: number;
  // subscription_id: string | null;
  // subscription?: Database['public']['Tables']['subscriptions']['Row'] | null;
}

export default AppConfig;
