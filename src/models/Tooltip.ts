import mongoose, { Schema, Model } from 'mongoose';
import { TooltipContentDocument } from '~/types/tooltip';

const TooltipContentSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: [true, 'User ID is required'],
    },
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Products',
      required: [true, 'Project ID is required'],
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    text: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image_url: {
      type: String,
      trim: true,
    },
    video_url: {
      type: String,
      trim: true,
    },
    article_url: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const TooltipContent: Model<TooltipContentDocument> =
  mongoose.models.TooltipContent ||
  mongoose.model('TooltipContent', TooltipContentSchema);

export default TooltipContent;
