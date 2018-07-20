import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';

import Products from "./routes/Products.js";


import Home from "./routes/Home.js";

import Wave from "./routes/Wave.js";

import Signal from "./routes/Signal.js";

import Alarn from "./routes/Alarn.js";

import Disturb from "./routes/Disturb.js";

import Plmns from "./routes/Plmns.js";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/Products" component={Products} />
      <Route path="/home" component={Home} />
      <Route path="/wave" component={Wave} />
      <Route path="/signal" component={Signal} />
      <Route path="/alarn" component={Alarn} />
      <Route path="/disturb" component={Disturb} />
      <Route path="/plmns" component={Plmns} />
    </Router>
  );
}

export default RouterConfig;
