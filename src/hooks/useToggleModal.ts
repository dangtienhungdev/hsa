import type { TModal, TModalType } from '@/interface/common.type';

import { useState } from 'react';

export const useToggleModal = <T>() => {
  const [currentModal, setCurrentModal] = useState<TModal<T>>({
    visiable: false, // trạng thái ẩn hiện
    type: null,
    currentData: null,
  });

  const handleOpenModal = (type: TModalType, data?: T) => {
    switch (type) {
      case 'add':
        setCurrentModal({
          type,
          visiable: true,
          currentData: null,
        });
        break;
      case 'edit':
      case 'view':
        setCurrentModal({
          type,
          visiable: true,
          currentData: data as T,
        });
        break;
    }
  };

  const handleCloseModal = () => {
    setCurrentModal({
      visiable: false,
      type: null,
      currentData: null,
    });
  };

  return {
    currentModal,
    onOpenModal: handleOpenModal,
    onCloseModal: handleCloseModal,
  };
};
