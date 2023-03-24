export interface IFanfiction {
  title: string;
  author: string;
  summary: string;
  fandom: string;
  rating: string;
  word_count: number;
  completed: boolean;
  created_at?: Date;
  updated_at?: Date;
}
