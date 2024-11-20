import mongoose from 'mongoose';

export interface SubscriptionDocument extends mongoose.Document {
  price_id: string;
  status: string;
  cancel_at_period_end: boolean;
  currency?: string;
  interval?: string;
  interval_count?: number;
  created_at: Date;
  period_starts_at?: Date;
  period_ends_at?: Date;
  trial_starts_at?: Date;
  trial_ends_at?: Date;
  user_id: mongoose.Types.ObjectId;
}
