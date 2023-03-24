import { Schema } from 'mongoose';

export interface IQuiz {
  title: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IQuizQuestion {
  quiz_id: Schema.Types.ObjectId;
  text: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IQuizAnswer {
  quiz_question_id: Schema.Types.ObjectId;
  text: string;
  value: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IQuizResult {
  user_id: Schema.Types.ObjectId;
  quiz_id: Schema.Types.ObjectId;
  quiz_answer_ids: Schema.Types.ObjectId[];
  created_at?: Date;
  updated_at?: Date;
}
