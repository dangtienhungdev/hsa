import type { Section } from '@/interface/section.type';

import axiosInstance from './request';

const url = `/sections`;

export const sectionApi = {
  // get all sections
  getAllSections: async (): Promise<Section[]> => {
    const response = await axiosInstance.get(url);

    return response.data;
  },
};
