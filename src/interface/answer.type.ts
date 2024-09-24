import type { QuestionType } from './question.type';

export type AnswerSingleType = {
  id: number;
  content: string;
  correct: boolean;
};

export type AnswerInputType = {
  id: number;
  content: string;
};

export type AnswerGroupType = {
  id: number;
  name: string;
  type: QuestionType;
  children: AnswerGroupChildren[];
};

export type AnswerGroupChildren = {
  id: number;
  name: string;
  type: QuestionType;
  answers: (AnswerSingleType | AnswerInputType)[];
};
