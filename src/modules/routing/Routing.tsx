import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import RequireAuth from './RequireAuth';
import { ForgotPassword, Login, NotFound, Register, ResetPassword, VerifyEmail } from '../auth';
import { DashboardHome, Profile } from '../dashboard';
import Home from '../home/Home';
import restrictions from './restrictions';
import routes from './routes';
import Layout from '../common/layout/Layout';
import SidebarLayout from '../dashboard/components/layout/SidebarLayout';

const Routing = () => {
  const location = useLocation();
  return (
    <TransitionGroup component={null}>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <Routes>
          <Route path={routes.Home.relativePath} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.Login.relativePath} element={<Login />} />
            <Route path={routes.Register.relativePath} element={<Register />} />
            <Route path={routes.ResetPassword.relativePath} element={<ResetPassword />} />
            <Route path={routes.ForgotPassword.relativePath} element={<ForgotPassword />} />
            <Route path={routes.VerifyEmail.relativePath} element={<VerifyEmail />} />
          </Route>
          <Route element={<SidebarLayout />}>
            <Route path={routes.Dashboard.absolutePath}>
              <Route index element={<RequireAuth element={<DashboardHome />} restrictedTo={restrictions.none} />} />
              <Route
                path={routes.Profile.relativePath}
                element={<RequireAuth element={<Profile />} restrictedTo={restrictions.none} />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Routing;
