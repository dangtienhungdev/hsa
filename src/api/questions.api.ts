import type { DataWithPaginate, TQueryParams } from '@/interface/common.type';
import type { TQuestion, TQuestionInput, TQuestionSingle } from '@/interface/question.type';

import axiosInstance from './request';

const url = '/questions';

export const questionApi = {
  // get all
  getAllQuestions: async (params?: TQueryParams) => {
    const response = await axiosInstance.get<DataWithPaginate<TQuestion>>(url, {
      params: {
        ...params,
      },
    });

    return response.data;
  },

  // create single question
  createQuestion: async (body: TQuestionSingle | TQuestionInput) => {
    const response = await axiosInstance.post(url, body);

    return response;
  },

  // edit question
  editQuestion: async (body: any) => {
    const response = await axiosInstance.put(`${url}/${body.question_id}`, body);

    return response;
  },
};
