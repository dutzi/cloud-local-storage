import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/docs">
        <Docs />
      </Route>
      <Route path="/password-reset">
        <PasswordReset />
      </Route>
    </Router>
  );
}

export default App;
