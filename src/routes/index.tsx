import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '@/layouts';
import ExamPage from '@/pages/exams';
import ExamId from '@/pages/exams/[examId]';
import LoginPage from '@/pages/login';
import Questions from '@/pages/questions';
import Subjects from '@/pages/subjects';
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
        path: pathUrl.subjects,
        element: (
          <LayoutPage>
            <Subjects />
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
        path: pathUrl.examDetail,
        element: (
          <LayoutPage>
            <ExamId />
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

const RenderRouter = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
