export type TModalType = 'add' | 'edit' | 'delete' | 'view' | null;

export type TModal<T> = {
  visiable: boolean;
  type: TModalType;
  currentData: T | null;
};
