import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { DASHBOARD_PAGE, HOME_PAGE } from './routes/routes';

const App: FunctionComponent<Record<string, any>> = () => {
  const Home = lazy(() => import('./components/pages/home'));
  const Dashboard = lazy(() => import('./components/pages/dashboard'));

  const routesList = [
    {
      path: HOME_PAGE,
      element: <Home />,
    },
    {
      path: DASHBOARD_PAGE,
      element: <Dashboard />,
    },
  ];

  console.log(process.env.REACT_APP_ENV);

  return (
    <BrowserRouter>
      <Suspense fallback='Loading...'>
        <Routes>
          {routesList.map(({ path, element }, idx) => (
            <Route path={path} element={element} key={idx} />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Sentry.withProfiler(App);
