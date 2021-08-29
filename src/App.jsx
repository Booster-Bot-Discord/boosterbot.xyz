import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useAuthCheck } from './services/auth';

import Landing from './pages/Landing/Landing';

import './scss/App.scss';

function App() {
  const authCheck = useAuthCheck();
  // eslint-disable-next-line
  React.useEffect(authCheck, []);
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
