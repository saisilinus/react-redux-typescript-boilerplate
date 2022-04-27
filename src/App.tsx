import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { useLoginMutation } from './modules/auth/auth.api';
import { selectCurrentUser } from './modules/auth/auth.slice';
import { ILoginRequest } from './modules/auth/auth.types';
import Loader from './modules/common/loader/Loader';

function App() {
  const userData: ILoginRequest = {
    email: 'jerry@example.com',
    password: 'password1',
  };

  const user = useSelector(selectCurrentUser);

  const [updateUser, { isLoading: isLogging }] = useLoginMutation();

  useEffect(() => {
    updateUser(userData);
  }, []);

  return (
    <>
      <Loader hide={!isLogging} />
      <div className="d-flex align-items-center justify-content-center h-100">
        <h1>Thank you for your patience {user?.name}</h1>
      </div>
    </>
  );
}

export default App;
