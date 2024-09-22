import type { FC } from 'react';
import type { RouteProps } from 'react-router';

import { Navigate } from 'react-router-dom';

import { getAccessTokenFromLocalStorage } from '@/utils/auth.util';
import pathUrl from '@/utils/path.util';

const PrivateRoute: FC<RouteProps> = props => {
  const sessionToken = getAccessTokenFromLocalStorage();

  return Boolean(sessionToken) ? (props.element as React.ReactElement) : <Navigate to={pathUrl.login} />;
};

export default PrivateRoute;
