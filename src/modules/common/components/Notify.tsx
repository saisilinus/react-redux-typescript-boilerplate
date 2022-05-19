import React from 'react';
import { ToastContainer, ToastOptions, Slide } from 'react-toastify';

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

export default NotifyContainer;
