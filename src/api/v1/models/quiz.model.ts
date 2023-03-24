import { Schema, model } from 'mongoose';
import { IQuiz, IQuizQuestion, IQuizAnswer, IQuizResult } from '../interfaces';

const quizSchema = new Schema<IQuiz>({
  title: String,
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const quizQuestionSchema = new Schema<IQuizQuestion>({
  quiz_id: { type: Schema.Types.ObjectId, ref: 'Quiz' },
  text: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const quizAnswerSchema = new Schema<IQuizAnswer>({
  quiz_question_id: {
    type: Schema.Types.ObjectId,
    ref: 'QuizQuestion',
  },
  text: String,
  value: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const quizResultSchema = new Schema<IQuizResult>({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  quiz_id: {
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  quiz_answer_ids: [
    {
      type: Schema.Types.ObjectId,
      ref: 'QuizAnswer',
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const Quiz = model<IQuiz>('Quiz', quizSchema);
export const QuizQuestion = model<IQuizQuestion>(
  'QuizQuestion',
  quizQuestionSchema
);
export const QuizAnswer = model<IQuizAnswer>('QuizAnswer', quizAnswerSchema);
export const QuizResult = model<IQuizResult>('QuizResult', quizResultSchema);
