import React from 'react';
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { ToastContainer, toast, ToastOptions, Slide } from 'react-toastify';
import { IErrorResponse } from '../definitions';

interface ICommonToastOptions extends ToastOptions {
  position: 'top-right';
  autoClose: 5000;
  hideProgressBar: false;
  closeOnClick: true;
  pauseOnHover: true;
  draggable: true;
  progress: undefined;
}

export const commonToastOptions: ICommonToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const NotifyContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    transition={Slide}
    theme="dark"
  />
);

const formatErrorMessage = (err: IErrorResponse | IErrorResponse['message']): string => {
  if (typeof err === 'string') {
    return err;
  }
  if (typeof err.message === 'string') {
    return err.message;
  }
  return 'Unknown server error';
};

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(formatErrorMessage(action.payload.data as IErrorResponse | IErrorResponse['message']));
  }

  return next(action);
};

export default NotifyContainer;
