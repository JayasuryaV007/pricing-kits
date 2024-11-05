import mongoose from 'mongoose';

export interface ProductContentDocument extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  name: string;
  description: string;
  product_website_url?: string;
  product_pricing_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Products {
  _id?: string;
  user_id: string;
  name: string;
  description: string;
  product_website_url?: string;
  product_pricing_url?: string;
  created_at?: Date;
  updated_at?: Date;
}
