import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/contexts/auth.context';
import pathUrl from '@/utils/path.util';

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();

  return isAuthenticated ? <Outlet /> : <Navigate to={pathUrl.login} />;
};

export const RejectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({
        pathname: pathUrl.exams,
      });
    }
  }, [isAuthenticated]);

  return !isAuthenticated ? <Outlet /> : <Navigate to={pathUrl.exams} />;
};
