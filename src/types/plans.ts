import mongoose from 'mongoose';

export interface PlanDocument extends mongoose.Document {
  name: String;
  max_pages: Number;
  price: Number;
}
