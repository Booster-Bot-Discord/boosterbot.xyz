import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing/Landing';

import './scss/App.scss';

function App() {

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
