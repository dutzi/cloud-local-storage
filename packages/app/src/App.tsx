import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Docs from './pages/Docs';

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/docs">
        <Docs />
      </Route>
    </Router>
  );
}

export default App;
