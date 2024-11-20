import mongoose, { Schema, Model } from 'mongoose';
import { SubscriptionDocument } from '~/types/subscriptions';

const SubscriptionSchema = new Schema<SubscriptionDocument>({
  price_id: {
    type: String,
    required: [true, 'Price ID is required'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
  },
  cancel_at_period_end: {
    type: Boolean,
    required: [true, 'Cancel at period end is required'],
  },
  currency: {
    type: String,
    required: false,
  },
  interval: {
    type: String,
    required: false,
  },
  interval_count: {
    type: Number,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  period_starts_at: {
    type: Date,
    required: false,
  },
  period_ends_at: {
    type: Date,
    required: false,
  },
  trial_starts_at: {
    type: Date,
    required: false,
  },
  trial_ends_at: {
    type: Date,
    required: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});

const Subscriptions: Model<SubscriptionDocument> =
  mongoose.models.Subscriptions ||
  mongoose.model<SubscriptionDocument>('Subscriptions', SubscriptionSchema);

export default Subscriptions;
