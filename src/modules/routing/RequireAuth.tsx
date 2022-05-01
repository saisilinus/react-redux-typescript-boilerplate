import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import Loader from '../common/loader/Loader';
import { useGetSingleUserQuery } from '../users/users.api';

type Props = {
  element: JSX.Element;
  restrictedTo: string[];
};

const RequireAuth = ({ element, restrictedTo }: Props) => {
  const location = useLocation();
  const id = localStorage.getItem('userId');
  if (id) {
    const { data: user, isLoading } = useGetSingleUserQuery({ id });

    if (isLoading) return <Loader />;

    if (!user || !restrictedTo.includes(user.role)) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } else if (!id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default RequireAuth;
