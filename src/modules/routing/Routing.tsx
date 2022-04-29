import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import { Lock, Login, NotFound, Register, ResetPassword, VerifyEmail } from '../auth';
import { DashboardHome, Profile } from '../dashboard';
import Home from '../home/Home';
import restrictions from './restrictions';
import routes from './routes';

const Routing = () => {
  return (
    <Routes>
      <Route path={routes.Home.path}>
        <Route index element={<Home />} />
        <Route path={routes.Login.path} element={<Login />} />
        <Route path={routes.Register.path} element={<Register />} />
        <Route path={routes.Lock.path} element={<Lock />} />
        <Route path={routes.ResetPassword.path} element={<ResetPassword />} />
        <Route path={routes.VerifyEmail.path} element={<VerifyEmail />} />
        <Route path={routes.Dashboard.path}>
          <Route index element={<RequireAuth element={<DashboardHome />} restrictedTo={restrictions.none} />} />
          <Route
            path={routes.Profile.path}
            element={<RequireAuth element={<Profile />} restrictedTo={restrictions.none} />}
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routing;
