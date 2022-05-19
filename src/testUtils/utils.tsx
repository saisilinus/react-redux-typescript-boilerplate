import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// reducers
import api from '../app/api';
import { rtkQueryErrorLogger } from '../app/middleware';

type Props = {
  route?: string;
  preloadedState?: any;
  store?: EnhancedStore;
  renderOptions?: RenderOptions;
};

function render(
  ui: ReactElement,
  {
    route = '/',
    preloadedState,
    store = configureStore({
      reducer: { [api.reducerPath]: api.reducer },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
      preloadedState,
    }),
    ...renderOptions
  }: Props = {}
) {
  window.history.pushState({}, 'Test page', route);
  const Wrapper = ({ children }: { children?: React.ReactNode }) => (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
