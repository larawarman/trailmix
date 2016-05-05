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
var GeoFire = require('geofire');

var ReactLeaflet = require('react-leaflet');

var update = require('react-addons-update');


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
      zoom: 16,
      position: [0,0],
    }
  },
  componentWillMount: function() {
    this.state.position = [this.state.localLat, this.state.localLng]
    this.geofireRef = new Firebase(fireUrl + '/geofire');
    this.geoFire = new GeoFire(this.geofireRef);
    Actions.getAllMixesLocations();
  },
  componentWillReceiveProps: function() {
    this.state.position = [this.state.localLat, this.state.localLng];
    this.geoQuery = this.geoFire.query({
      center: this.state.position,
      radius: 0.5
    });
    this.getLocalLocations();
  },
  render: function() {
    var mb = 'pk.eyJ1IjoibGFyYXdhcm1hbiIsImEiOiJjaW05ZDc3ZHEwM21qdG5tNm1lNnc5enBiIn0.5qqJjeDHM2t7FKHoHWlu2Q';
    if (this.state.localLat === 0 && this.state.localLng === 0) {
      return <div className="map-container">
        <h1>Loading location...</h1>
      </div>
    } else {
      return <div className='map-container'>
          <ReactLeaflet.Map 
          center={this.state.position} 
          zoom={this.state.zoom} 
          zoomControl={false}
          dragging={false}
          touchzoom={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}>
            <ReactLeaflet.TileLayer
              attribution="&copy; <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
              url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mb}
              id='mapbox.light'
            />
            <ReactLeaflet.Circle center={this.state.position} radius={500} color={'rgba(193,202,86,0.0)'} fillColor = {'rgba(223,79,88,1.0)'}/>
            {this.renderSingleMarkers()}
            {this.renderMultiMarkers()}
          </ReactLeaflet.Map>
      </div>
    }
  },
  getLocalLocations: function() {
    this.geoQuery.on("key_entered", function(key, location, distance) {
      ViewMixStore.setState({
        local_mix_locations: ViewMixStore.state.local_mix_locations.concat([key])
      });
    });
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
