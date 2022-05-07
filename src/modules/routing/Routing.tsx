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
          <Route path={routes.Home.path} element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={routes.Login.path} element={<Login />} />
            <Route path={routes.Register.path} element={<Register />} />
            <Route path={routes.ResetPassword.path} element={<ResetPassword />} />
            <Route path={routes.ForgotPassword.path} element={<ForgotPassword />} />
            <Route path={routes.VerifyEmail.path} element={<VerifyEmail />} />
          </Route>
          <Route element={<SidebarLayout />}>
            <Route path={`/${routes.Dashboard.path}`}>
              <Route index element={<RequireAuth element={<DashboardHome />} restrictedTo={restrictions.none} />} />
              <Route
                path={routes.Profile.path}
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
