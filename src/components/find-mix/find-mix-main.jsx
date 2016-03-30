var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router');
var Link = Router.Link;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');
var Firebase = require('firebase');

var LeafletMap = require('./leaflet-map');
//var MapboxMap = require('./mapbox-map');

var MapboxToken = require('../../utils/mapbox-config');

var LocationStore = require('../../stores/location-store');


module.exports = React.createClass({
  render: function() {
    return <div>
      <h1>welcome to trailmix</h1>
      <Link to="/make-mix/new" className="navbar-brand">
        make ur mix
      </Link>
      <LeafletMap />
    </div>
  }
});