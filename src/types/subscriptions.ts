import mongoose from 'mongoose';

export interface SubscriptionDocument extends mongoose.Document {
  status: string;
  period_starts_at?: Date;
  period_ends_at?: Date;
  user_id: mongoose.Types.ObjectId;
  plan_id: mongoose.Types.ObjectId;
}
