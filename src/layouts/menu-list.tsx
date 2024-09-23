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
    code: `${pathUrl.subjects}-list`,
    title: 'Các môn học',
    icon: 'dashboard',
    path: pathUrl.subjects,
  },
  {
    code: `${pathUrl.questions}-list`,
    title: 'Danh sách câu hỏi',
    icon: 'dashboard',
    path: pathUrl.questions,
  },
];

export default menuList;
