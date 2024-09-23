import type { TExam } from './exam.type';
import type { TSubject } from './subject.type';

export type QuestionType = 'input' | 'group' | 'single';

export type TQuestion = {
  id: number;
  exam_id: string;
  subject_id: string;
  name: string;
  type: QuestionType;
  is_group: '0';
  parent_id: number;
  exam: TExam;
  subject: TSubject;
};
