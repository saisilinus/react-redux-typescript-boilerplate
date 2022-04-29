import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../auth/auth.slice';

type Props = {
  element: JSX.Element;
  restrictedTo: string[];
};

const RequireAuth = ({ element, restrictedTo }: Props) => {
  const user = useAppSelector(selectCurrentUser);
  const location = useLocation();

  if (!user || !restrictedTo.includes(user.role)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return element;
};

export default RequireAuth;
