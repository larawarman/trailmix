var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var LeafletGeofireMap = require('./leaflet-geofire-map');


module.exports = React.createClass({
  render: function() {
    return <div className='top-nav'>
      <h1>trailmix</h1>
      <Link to="/make-mix/new" className="make-mix-btn">
        drop a new mix
      </Link>
    </div>
  }
});
