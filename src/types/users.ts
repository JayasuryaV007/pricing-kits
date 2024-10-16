import mongoose from 'mongoose';

export interface Users {
  email: string;
  password: string;
  createdAt?: Date;
}

export interface UserDocument extends mongoose.Document, Users {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

export interface UserWithId extends Users {
  _id: string;
}
