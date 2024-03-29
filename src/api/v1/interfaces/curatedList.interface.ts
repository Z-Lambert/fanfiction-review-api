import { Schema } from 'mongoose';

export interface ICuratedList {
  user_id: Schema.Types.ObjectId;
  fanfiction_id: Schema.Types.ObjectId;
  status: 'To Read' | 'Reading' | 'Completed';
  created_at?: Date;
  updated_at?: Date;
}
