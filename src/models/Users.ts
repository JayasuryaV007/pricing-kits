import mongoose, { Schema, Model } from 'mongoose';
import { UserDocument } from '~/types/users';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const UserSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    validate: {
      validator: function (v: string) {
        return emailRegex.test(v);
      },
      message: 'Please enter a valid email address',
    },
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Description cannot be less than 6 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Users: Model<UserDocument> =
  mongoose.models.Users || mongoose.model<UserDocument>('Users', UserSchema);

export default Users;
