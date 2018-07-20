import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Wave from "./routes/Wave.js";
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/wave" component={Wave} />
    </Router>
  );
}

export default RouterConfig;
