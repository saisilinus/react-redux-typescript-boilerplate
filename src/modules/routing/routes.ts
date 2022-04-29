export interface IRoutePath {
  path: string;
}

const routes: Record<string, IRoutePath> = {
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
