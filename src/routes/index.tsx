import type { RouteObject } from 'react-router';

import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useRoutes } from 'react-router-dom';

import LayoutPage from '@/layouts';
import ExamPage from '@/pages/exams';
import ExamId from '@/pages/exams/[examId]';
import SectionPage from '@/pages/exams/[examId]/[sectionId]';
import LoginPage from '@/pages/login';
import Questions from '@/pages/questions';
import QuestionDetail from '@/pages/questions/[subjectId]';
import CreateQuestion from '@/pages/questions/create-question';
import Subjects from '@/pages/subjects';
import pathUrl from '@/utils/path.util';

import { ProtectedRoute, RejectedRoute } from './config';

const NotFound = lazy(() => import('@/pages/404'));

const routeList: RouteObject[] = [
  {
    path: pathUrl.login,

    element: <RejectedRoute />,
    children: [
      {
        path: pathUrl.login,
        element: <LoginPage />,
      },
    ],
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
        path: pathUrl.questionDetail,
        element: (
          <LayoutPage>
            <QuestionDetail />
          </LayoutPage>
        ),
      },
      {
        path: pathUrl.addQuestion,
        element: (
          <LayoutPage>
            <CreateQuestion />
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
      {
        path: pathUrl.examDetailSection,
        element: (
          <LayoutPage>
            <SectionPage />
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
