import mongoose, { Schema, Model } from 'mongoose';
import { ProductContentDocument } from '~/types/products';

const Products = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User ID is required'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    product_website_url: {
      type: String,
      required: true,
      trim: true,
    },
    product_pricing_url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Product: Model<ProductContentDocument> =
  mongoose.models.Product || mongoose.model('Product', Products);

export default Product;
