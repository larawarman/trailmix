var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var LeafletMap = require('./leaflet-map');
// var AudioPlayer = require('../listen/audio-player');


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