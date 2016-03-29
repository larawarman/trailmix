var React = require('react');

var ReactLeaflet = require('react-leaflet');

module.exports = React.createClass({
  render: function() {
    var markerPosition = [this.props.mix.location.lat, this.props.mix.location.lng]
    return <ReactLeaflet.Marker position={markerPosition} key={this.props.key}>
      <ReactLeaflet.Popup>
        <span>{this.props.mix.location.label}</span>
      </ReactLeaflet.Popup>
    </ReactLeaflet.Marker>
  }
});