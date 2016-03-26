var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/main');
var MakeMix = require('./components/make-mix/make-mix-main');

module.exports = (
  <Router>
    <Route path="/" component={Main}>
      <Route path="make-mix/new" component={MakeMix} />
    </Route>
  </Router>
);