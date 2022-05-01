import React from 'react';
import { Outlet } from 'react-router-dom';
import NotifyContainer from '../toast/Notify';

const Layout = () => {
  return (
    <div>
      <NotifyContainer />
      <Outlet />
    </div>
  );
};

export default Layout;
