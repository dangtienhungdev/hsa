import type { TQuestion, TQuestionSingle } from '@/interface/question.type';

import axiosInstance from './request';

const url = '/questions';

export const questionApi = {
  // get all
  getAllQuestions: async () => {
    const response = await axiosInstance.get<TQuestion[]>(url);

    return response.data;
  },

  // create single question
  createQuestionSignle: async (body: TQuestionSingle) => {
    const response = await axiosInstance.post(url, body);

    return response;
  },
};
