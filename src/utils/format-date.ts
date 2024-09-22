import dayjs from 'dayjs';

export const formatDate = (date: string, type?: string) => {
  const dateFormat = dayjs(date).format(type ?? 'DD/MM/YYYY HH:mm');

  return dateFormat;
};
