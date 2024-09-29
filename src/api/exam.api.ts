import type { TBodyExam, TExam } from '@/interface/exam.type';
import type { Section } from '@/interface/section.type';
import type { DataWithPaginate } from './../interface/common.type';

import axiosInstance from './request';

const url = `/exams`;
const listQuestionByExamSecion = `/list-questions-by-exam-and-section`;

export const examApi = {
  // get exams
  getExams: async (): Promise<DataWithPaginate<TExam>> => {
    const response = await axiosInstance.get(url);

    return response.data;
  },

  deleteExam: async (id: number) => {
    const response = await axiosInstance.delete(`${url}/${id}`);

    return response.data;
  },

  // thêm mới đề thi
  createExam: async (data: Omit<TBodyExam, 'id'>) => {
    const response = await axiosInstance.post(url, data);

    return response.data;
  },

  // cập nhật đề thi
  editExam: async (data: TBodyExam) => {
    const response = await axiosInstance.put(`${url}/${data.id}`, data);

    return response.data;
  },

  // get sections
  getQuestionInExamSection: async (examId: string, sectionId: string) => {
    const response = await axiosInstance.get<Section>(`${listQuestionByExamSecion}/${examId}/${sectionId}`);

    return response;
  },
};
