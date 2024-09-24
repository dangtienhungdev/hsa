import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import type { RouteProps } from 'react-router';
import { getAccessTokenFromLocalStorage } from '@/utils/auth.util';
import pathUrl from '@/utils/path.util';
import { useAuthContext } from '@/contexts/auth.context';
import { useEffect } from 'react';

export type WrapperRouteProps = RouteProps & {
  titleId: string;
};

const WrapperRouteComponent = ({ titleId }: WrapperRouteProps) => {
  const sessionToken = getAccessTokenFromLocalStorage();

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionToken) {
      navigate(pathUrl.login);
    }

    if (titleId) {
      document.title = titleId; // Set document title based on the titleId prop
    }
  }, [sessionToken, titleId, navigate]);

  return <Outlet />;
};

export default WrapperRouteComponent;

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to={pathUrl.login} />;
};

export const RejectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return !isAuthenticated ? <Outlet /> : <Navigate to={pathUrl.questions} />;
};
