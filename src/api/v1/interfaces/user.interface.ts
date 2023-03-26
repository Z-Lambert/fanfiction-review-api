import mongoose from 'mongoose';

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  favouriteFandoms?: string[];
  interests?: string[];
}
