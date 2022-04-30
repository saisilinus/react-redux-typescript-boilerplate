interface IRoutePath {
  path: string;
}

interface IRoutes {
  Home: IRoutePath;
  Login: IRoutePath;
  Register: IRoutePath;
  Lock: IRoutePath;
  Profile: IRoutePath;
  ResetPassword: IRoutePath;
  VerifyEmail: IRoutePath;
  NotFound: IRoutePath;
  Dashboard: IRoutePath;
}

const routes: IRoutes = {
  Home: { path: '/' },
  Login: { path: 'login' },
  Register: { path: 'register' },
  Lock: { path: 'lock' },
  Profile: { path: 'profile' },
  ResetPassword: { path: 'reset-password' },
  VerifyEmail: { path: 'verify-email' },
  NotFound: { path: 'not-found' },
  Dashboard: { path: 'dashboard' },
};

export default routes;
