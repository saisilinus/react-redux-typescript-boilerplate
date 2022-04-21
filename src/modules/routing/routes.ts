export interface IRoutePath {
  path: string;
}

const routes: Record<string, IRoutePath> = {
  Home: { path: '/' },
};

export default routes;
