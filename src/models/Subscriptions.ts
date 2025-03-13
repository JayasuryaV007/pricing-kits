import mongoose, { Schema, Model } from 'mongoose';
import { SubscriptionDocument } from '~/types/subscriptions';

const SubscriptionSchema = new Schema<SubscriptionDocument>({
  subscription_id: {
    type: String,
  },
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
  cancel_at_period_end: {
    type: Boolean,
  },
  stripe_customer_id: {
    type: String,
  },
  price_id: {
    type: String,
    ref: 'Plans',
  },
  // plan_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Plans',
  //   required: true,
  // },
});

const Subscriptions: Model<SubscriptionDocument> =
  mongoose.models.Subscriptions ||
  mongoose.model<SubscriptionDocument>('Subscriptions', SubscriptionSchema);

export default Subscriptions;
