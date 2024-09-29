import type { TSubject } from './subject.type';

export type Section = {
  id: number;
  exam_id: string;
  name: string;
  is_mandatory: string;
  timing: string;
  created_at: string;
  updated_at: string;
  subjects: TSubject[];
};
