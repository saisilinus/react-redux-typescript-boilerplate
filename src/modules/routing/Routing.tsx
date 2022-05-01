import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import { Lock, Login, NotFound, Register, ResetPassword, VerifyEmail } from '../auth';
import { DashboardHome, Profile } from '../dashboard';
import Home from '../home/Home';
import restrictions from './restrictions';
import routes from './routes';
import Layout from '../common/layout/Layout';

const Routing = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage('fadeOut');
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransistionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      <Routes>
        <Route path={routes.Home.path} element={<Layout />}>
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
    </div>
  );
};

export default Routing;
