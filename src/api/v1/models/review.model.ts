import { Schema, model } from 'mongoose';
import { IReview } from '../interfaces';

const reviewSchema = new Schema<IReview>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  fanfiction_id: { type: Schema.Types.ObjectId, ref: 'Fanfiction' },
  title: String,
  body: String,
  rating: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Review = model<IReview>('Review', reviewSchema);
