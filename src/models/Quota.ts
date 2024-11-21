import mongoose, { Schema, Model } from 'mongoose';
import { QuotaDocument } from '~/types/quota';

const QuotaSchema = new Schema<QuotaDocument>({
  page_count: {
    type: Number,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});

const Quota: Model<QuotaDocument> =
  mongoose.models.Quota || mongoose.model<QuotaDocument>('Quota', QuotaSchema);

export default Quota;
