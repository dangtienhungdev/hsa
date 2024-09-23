import type { TSubject } from '@/interface/subject.type';

import axiosInstance from './request';

const url = `/subjects`;

export const subjectApi = {
  // get all subjects
  getAllSubject: async () => {
    const response = await axiosInstance.get<TSubject[]>(url);

    return response.data;
  },
};
