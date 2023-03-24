import { Schema, model } from 'mongoose';
import { IReadingList } from '../interfaces';

const readingListSchema = new Schema<IReadingList>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  fanfiction_id: { type: Schema.Types.ObjectId, ref: 'Fanfiction' },
  status: { type: String, enum: ['To Read', 'Reading', 'Completed'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const ReadingList = model<IReadingList>(
  'ReadingList',
  readingListSchema
);
