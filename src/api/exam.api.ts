import axiosInstance from './request';

export const examApi = {
  // get exams
  getExams: async () => {
    const response = await axiosInstance.get(`/exams`);

    console.log('🚀 ~ getExams: ~ response:', response);

    return response.data;
  },
};
