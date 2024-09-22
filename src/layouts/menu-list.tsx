import type { MenuList } from '@/interface/layout/menu.interface';

import pathUrl from '@/utils/path.util';

const menuList: MenuList = [
  {
    code: `${pathUrl.exams}-list`,
    title: 'Danh sách đề thi',
    icon: 'dashboard',
    path: pathUrl.exams,
  },
  {
    code: `${pathUrl.questions}-list`,
    title: 'Câu hỏi',
    icon: 'dashboard',
    path: pathUrl.questions,
    children: [
      {
        code: pathUrl.addQuestion,
        title: 'Thêm câu hỏi',
        icon: 'dashboard',
        path: pathUrl.addQuestion,
      },
      {
        code: pathUrl.questions,
        title: 'Danh sách câu hỏi',
        icon: 'dashboard',
        path: pathUrl.questions,
      },
    ],
  },
];

export default menuList;
