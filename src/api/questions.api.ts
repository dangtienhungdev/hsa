import type { TQuestion } from '@/interface/question.type';

import axiosInstance from './request';

const url = '/questions';

export const questionApi = {
  // get all
  getAllQuestions: async () => {
    const response = await axiosInstance.get<TQuestion[]>(url);

    return response.data;
  },
};
