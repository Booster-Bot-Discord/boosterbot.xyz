import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuthCheck } from './services/auth';

import Loading from './components/Loading';

import './scss/App.scss';

const Landing = React.lazy(() => import('./pages/Landing/Landing'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'))

function App() {
  const authCheck = useAuthCheck();
  // eslint-disable-next-line
  React.useEffect(authCheck, []);
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Switch>

          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>

          <Route path="/">
            <Landing />
          </Route>

          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
