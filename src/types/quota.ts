import mongoose from 'mongoose';

export interface QuotaDocument extends mongoose.Document {
  page_count: Number;
  user_id: mongoose.Types.ObjectId;
}
