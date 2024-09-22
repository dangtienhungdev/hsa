import type { FC } from 'react';
import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '@/layouts';
import ExamPage from '@/pages/exams';
import AddExam from '@/pages/exams/add-exam';
import LoginPage from '@/pages/login';
import Questions from '@/pages/questions';
import AddQuestion from '@/pages/questions/add-question';
import pathUrl from '@/utils/path.util';

import { ProtectedRoute } from './config';

const NotFound = lazy(() => import('@/pages/404'));

const routeList: RouteObject[] = [
  {
    path: pathUrl.login,
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Navigate to={pathUrl.questions} />,
      },
      {
        path: pathUrl.questions,
        element: (
          <LayoutPage>
            <Questions />
          </LayoutPage>
        ),
      },
      {
        path: pathUrl.addQuestion,
        element: (
          <LayoutPage>
            <AddQuestion />
          </LayoutPage>
        ),
      },
      {
        path: pathUrl.exams,
        element: (
          <LayoutPage>
            <ExamPage />
          </LayoutPage>
        ),
      },
      {
        path: pathUrl.addExam,
        element: (
          <LayoutPage>
            <AddExam />
          </LayoutPage>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <LayoutPage>
        <NotFound />
      </LayoutPage>
    ),
  },
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
