import { Schema } from 'mongoose';

export interface IReview {
  user_id: Schema.Types.ObjectId;
  fanfiction_id: Schema.Types.ObjectId;
  title: string;
  body: string;
  rating: number;
  created_at?: Date;
  updated_at?: Date;
}
