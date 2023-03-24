import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true },
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const User = model<IUser>('User', userSchema);
