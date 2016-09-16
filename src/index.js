import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router, IndexRoute } from 'react-router';
import App from './application/component';
import Index from './index/component';
import Dynamic from './dynamic/component';
import PageNavigation from './pagenavigation/component';
import Filters from './filters/component';
import Defaults from './defaults/component';
import Settings from './settings/component';
import DataSelected from './dataselected/component';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="/dynamic" component={Dynamic} />
      <Route path="/pagenavigation" component={PageNavigation} />
      <Route path="/filters" component={Filters} />
      <Route path="/defaults" component={Defaults} />
      <Route path="/settings" component={Settings} />
      <Route path="/dataselected" component={DataSelected} />
    </Route>
  </Router>,
  document.getElementById('root')
);
