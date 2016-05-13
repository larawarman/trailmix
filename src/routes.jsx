var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var hashHistory = ReactRouter.browserHistory;
var Route = ReactRouter.Route;

var Main = require('./components/main');
var MakeMix = require('./components/make-mix/make-mix-main');
var ViewSingleMix = require('./components/view-mix/view-single-mix');
var ViewLocation = require('./components/view-mix/view-location')

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <Route path="make-mix/new" component={MakeMix} />
      <Route path="mix/:id" component={ViewSingleMix} />
      <Route path="place/:id" component={ViewLocation} />
    </Route>
  </Router>
);