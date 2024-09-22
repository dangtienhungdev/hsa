import type { TBodyExam, TExam } from '@/interface/exam.type';

import axiosInstance from './request';

const url = `/exams`;

export const examApi = {
  // get exams
  getExams: async () => {
    const response = await axiosInstance.get<TExam[]>(url);

    return response.data;
  },

  deleteExam: async (id: number) => {
    const response = await axiosInstance.delete(`${url}/${id}`);

    return response.data;
  },

  // thêm mới đề thi
  createExam: async (data: FormData) => {
    const response = await axiosInstance.post(url, data);

    return response.data;
  },

  // cập nhật đề thi
  editExam: async (data: TBodyExam) => {
    const response = await axiosInstance.put(`${url}/${data.id}`, data);

    return response.data;
  },
};
