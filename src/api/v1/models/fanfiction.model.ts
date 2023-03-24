import { Schema, model } from 'mongoose';
import { IFanfiction } from '../interfaces';

const fanfictionSchema = new Schema<IFanfiction>({
  title: String,
  author: String,
  summary: String,
  fandom: String,
  rating: String,
  word_count: Number,
  completed: Boolean,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Fanfiction = model<IFanfiction>('Fanfiction', fanfictionSchema);
