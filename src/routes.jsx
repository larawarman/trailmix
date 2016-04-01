var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var browserHistory = ReactRouter.browserHistory;
var hashHistory = ReactRouter.browserHistory;
var Route = ReactRouter.Route;

var Main = require('./components/main');
var MakeMix = require('./components/make-mix/make-mix-main');
var ViewSingleMix = require('./components/view-mix/view-single-mix');

module.exports = (
  // <Router history={browserHistory}>
  <Router>
    <Route path="/" component={Main}>
      <Route path="make-mix/new" component={MakeMix} />
      <Route path="mix/:id" component={ViewSingleMix} />
    </Route>
  </Router>
);