export type TModalType = 'add' | 'edit' | 'delete' | 'view' | null;

export type TModal<T> = {
  visiable: boolean;
  type: TModalType;
  currentData: T | null;
};

export type Response<T> = {
  success: string;
  data: T[];
};

export type ResponseWithPagination<T> = {
  success: string;
  data: DataWithPaginate<T>;
};

export type DataWithPaginate<T> = {
  current_page: number;
  data: T[];
  total: number;
  per_page: number;
};
