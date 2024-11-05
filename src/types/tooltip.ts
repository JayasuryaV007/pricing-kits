import mongoose from 'mongoose';

export interface TooltipContentDocument extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  image_url?: string;
  video_url?: string;
  article_url?: string;
  created_at: Date;
  updated_at: Date;
}
