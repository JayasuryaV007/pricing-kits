import mongoose from 'mongoose';

export interface SubscriptionDocument extends mongoose.Document {
  status: string;
  period_starts_at?: Date;
  period_ends_at?: Date;
  stripe_customer_id: string;
  cancel_at_period_end: boolean;
  price_id: string;
  user_id: mongoose.Types.ObjectId;
  subscription_id: string;
  // plan_id: mongoose.Types.ObjectId;
}
