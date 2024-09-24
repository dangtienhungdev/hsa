import { Navigate } from 'react-router-dom';
import type { RouteProps } from 'react-router';
import { getAccessTokenFromLocalStorage } from '@/utils/auth.util';
import pathUrl from '@/utils/path.util';

const PrivateRoute = (props: RouteProps) => {
  const sessionToken = getAccessTokenFromLocalStorage();

  return Boolean(sessionToken) ? (props.element as React.ReactElement) : <Navigate to={pathUrl.login} />;
};

export default PrivateRoute;
