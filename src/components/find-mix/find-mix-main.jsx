var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

var MapboxToken = require('../../utils/mapbox-config');


module.exports = React.createClass({
  render: function() {
    return <div>
      <h1>welcome to trailmix</h1>
      <Link to="/make-mix/new" className="navbar-brand">
        make ur mix
      </Link>
    </div>
  }
});