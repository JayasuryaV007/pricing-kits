/**
 * This interface combines the user's metadata from
 * Supabase Auth and the user's record in Database
 */
interface UserSubscription {
  status: string;
  period_starts_at?: Date;
  period_ends_at?: Date;
  user_id: string;
  plan_id: string;
}

export default UserSubscription;
