var React = require('react');
var ReactDOM = require('react-dom');

var Actions = require('../../actions');

var Router = require('react-router');
// var browserHistory = Router.browserHistory;
// var Link = Router.Link;


var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/location-store');
var ViewMixStore = require('../../stores/viewMix-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var ReactLeaflet = require('react-leaflet');


module.exports = React.createClass({
  contextTypes : {
    router: React.PropTypes.object.isRequired
  },
  mixins:[
    StateMixin.connect(LocationStore),
    StateMixin.connect(ViewMixStore),
    ReactFire
  ],
  getInitialState: function() {
    return{
      zoom: 50,
    }
  },
  componentWillMount: function() {
    Actions.getAllMixes();
    Actions.getAllLocations();
  },
  render: function() {
    var position = [this.state.localLat, this.state.localLng];
    var mb = 'pk.eyJ1IjoibGFyYXdhcm1hbiIsImEiOiJjaW05ZDc3ZHEwM21qdG5tNm1lNnc5enBiIn0.5qqJjeDHM2t7FKHoHWlu2Q';
    return <div>
      <div className='map-container'>
        <ReactLeaflet.Map center={position} zoom={this.state.zoom}>
          <ReactLeaflet.TileLayer
            attribution="&copy; <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
            url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mb}
            id='mapbox.light'
          />
          {this.renderSingleMarkers()}
          {this.renderMultiMarkers()}
        </ReactLeaflet.Map>
      </div>
    </div>
  },
  renderSingleMarkers: function() {
    var pub_solos = [];
    for (var key in this.state.solos_published) {
      var mix = this.state.solos_published[key];
      var markerPosition = mix.markerPosition;
      var key = mix.key;
      var place = mix.place;
      var tags = mix.tags;
      pub_solos.push(
        <ReactLeaflet.Marker 
        position={markerPosition} 
        key={key}
        >
          <ReactLeaflet.Popup>
            <div key={key} onClick={this.handlePopupClick.bind(this, {key})} >
              <p>{place}</p>
              <p>{tags}</p>
            </div>
          </ReactLeaflet.Popup>
        </ReactLeaflet.Marker>
      )
    }
    return pub_solos;
  },
  renderMultiMarkers: function() {

  },
  handlePopupClick: function(id, j) {
    var mixRoute = id.key;
    this.context.router.push({
      pathname: '/mix/' + mixRoute,
      id: mixRoute
    });
    browserHistory.push({
      pathname: '/mix/' + mixRoute,
      id: mixRoute
    });
  }
});
