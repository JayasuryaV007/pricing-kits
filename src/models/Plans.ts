import mongoose, { Schema, Model } from 'mongoose';
import { PlanDocument } from '~/types/plans';

const PlanSchema = new Schema<PlanDocument>({
  name: {
    type: String,
    required: true,
  },
  max_pages: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  price_id: {
    type: String,
  },
});

const Plans: Model<PlanDocument> =
  mongoose.models.Plans || mongoose.model<PlanDocument>('Plans', PlanSchema);

export default Plans;
