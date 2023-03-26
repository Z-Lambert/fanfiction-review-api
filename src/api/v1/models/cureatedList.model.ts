import { Schema, model } from 'mongoose';
import { ICuratedList } from '../interfaces';

const curatedListSchema = new Schema<ICuratedList>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  fanfiction_id: { type: Schema.Types.ObjectId, ref: 'Fanfiction' },
  status: { type: String, enum: ['To Read', 'Reading', 'Completed'] },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const CuratedList = model<ICuratedList>(
  'ReadingList',
  curatedListSchema
);
