var React = require('react');
var ReactDOM = require('react-dom');

var Actions = require('../../actions');

var Router = require('react-router');
// var browserHistory = Router.browserHistory;
// var Link = Router.Link;


var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var CreateLocationStore = require('../../stores/createLocation-store');
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
    StateMixin.connect(CreateLocationStore),
    StateMixin.connect(ViewMixStore),
    ReactFire
  ],
  getInitialState: function() {
    return{
      zoom: 50,
    }
  },
  componentWillMount: function() {
    Actions.getAllMixesLocations();
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
        opacity={0.5}
        >
          <ReactLeaflet.Popup>
            <div key={key} onClick={this.handleSinglePopupClick.bind(this, {key})} >
              <p>{place}</p>
              <p>{tags}</p>
            </div>
          </ReactLeaflet.Popup>
        </ReactLeaflet.Marker>
      );
    }
    return pub_solos;
  },
  renderMultiMarkers: function() {
    var pub_multis = [];
    for (var key in this.state.multis_published) {
      var mix = this.state.multis_published[key];
      var markerPosition = [mix.drop_lat, mix.drop_lng];
      var count = mix.mixcount;
      var location_tm_key = mix.location_tm_key;
      var place = mix.drop_name;
      pub_multis.push(
        <ReactLeaflet.Marker 
        position={markerPosition} 
        key={location_tm_key}
        place={place}
        onClick={this.handleMultiMarkerClick.bind(this, {location_tm_key, place})}
        >
        </ReactLeaflet.Marker>
      );
    }
    return pub_multis;
  },
  handleSinglePopupClick: function(id) {
    var mixRoute = id.key;
    this.context.router.push({
      pathname: '/mix/' + mixRoute,
      id: mixRoute
    });
    // browserHistory.push({
    //   pathname: '/mix/' + mixRoute,
    //   id: mixRoute
    // });
  },
  handleMultiMarkerClick:function(id) {
    var locRoute = id.location_tm_key;
    var place = id.place;
    console.log(place);
    this.context.router.push({
      pathname: '/place/' + locRoute,
      id: locRoute,
      place: place
    });
    // browserHistory.push({
    //   pathname: '/place/' + locRoute,
    //   id: locRoute
    // });
  }
});
