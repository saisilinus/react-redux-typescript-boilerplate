interface IRoutePath {
  relativePath: string;
  absolutePath: string;
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
  ForgotPassword: IRoutePath;
  UserList: IRoutePath;
}

const routes: IRoutes = {
  Home: { relativePath: '/', absolutePath: '/' },
  Login: { relativePath: 'login', absolutePath: '/login' },
  Register: { relativePath: 'register', absolutePath: '/register' },
  Lock: { relativePath: 'lock', absolutePath: '/lock' },
  ResetPassword: { relativePath: 'reset-password', absolutePath: '/reset-password' },
  VerifyEmail: { relativePath: 'verify-email', absolutePath: '/verify-email' },
  NotFound: { relativePath: 'not-found', absolutePath: '/not-found' },
  Dashboard: { relativePath: 'dashboard', absolutePath: '/dashboard' },
  Profile: { relativePath: 'profile', absolutePath: '/dashboard/profile' },
  ForgotPassword: { relativePath: 'forgot-password', absolutePath: '/forgot-password' },
  UserList: { relativePath: 'user-list', absolutePath: '/dashboard/user-list' },
};

export default routes;
