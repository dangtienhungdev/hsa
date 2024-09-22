import type { MenuList } from '@/interface/layout/menu.interface';

import pathUrl from '@/utils/path.util';

const mockMenuList: MenuList = [
  {
    code: `${pathUrl.exams}-list`,
    title: 'Đề thi',
    icon: 'documentation',
    path: pathUrl.exams,
    children: [
      {
        code: pathUrl.addExam,
        title: 'Thêm đề thi',
        icon: 'dashboard',
        path: pathUrl.addExam,
      },
      {
        code: pathUrl.exams,
        title: 'Danh sách đề thi',
        icon: 'dashboard',
        path: pathUrl.exams,
      },
    ],
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

export default mockMenuList;
