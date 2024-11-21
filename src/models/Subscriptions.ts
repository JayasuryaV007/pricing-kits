import mongoose, { Schema, Model } from 'mongoose';
import { SubscriptionDocument } from '~/types/subscriptions';

const SubscriptionSchema = new Schema<SubscriptionDocument>({
  status: {
    type: String,
    required: [true, 'Status is required'],
  },
  period_starts_at: {
    type: Date,
    required: false,
  },
  period_ends_at: {
    type: Date,
    required: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plans',
    required: true,
  },
});

const Subscriptions: Model<SubscriptionDocument> =
  mongoose.models.Subscriptions ||
  mongoose.model<SubscriptionDocument>('Subscriptions', SubscriptionSchema);

export default Subscriptions;
