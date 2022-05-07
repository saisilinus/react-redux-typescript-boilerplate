import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Loader from '../common/loader/Loader';
import { useGetSingleUserQuery } from '../users/users.api';
import routes from './routes';

type Props = {
  element: JSX.Element;
  restrictedTo: string[];
};

const RequireAuth = ({ element, restrictedTo }: Props) => {
  const location = useLocation();
  const id = sessionStorage.getItem('userId') || localStorage.getItem('userId');
  if (id) {
    const { data: user, isLoading } = useGetSingleUserQuery({ id });

    if (isLoading) return <Loader />;

    if (!user || !restrictedTo.includes(user.role)) {
      return <Navigate to={routes.Login.absolutePath} state={{ from: location }} replace />;
    }
  } else if (!id) {
    return <Navigate to={routes.Login.absolutePath} state={{ from: location }} replace />;
  }

  return element;
};

export default RequireAuth;
