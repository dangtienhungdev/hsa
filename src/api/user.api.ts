import axiosInstance from './request';

export const userApi = {
  login: async (body: FormData) => {
    const response = await axiosInstance.post(`/login`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};
