var React = require('react');
var ReactDOM = require('react-dom');

var Actions = require('../../actions');

var ReactRouter = require('react-router');
var hashHistory = ReactRouter.hashHistory;
// var browserHistory = Router.browserHistory;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var CreateLocationStore = require('../../stores/createLocation-store');
var ViewMixStore = require('../../stores/viewMix-store');

var ReactFire = require('reactfire');
// var fireUrl = 'https://trailmix0.firebaseio.com/';
var GeoFire = require('geofire');

var Leaflet = require('leaflet');
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
      minzoom: 16,
      maxzoom: 20,
      zoom: 16,
      position: [0,0],
    }
  },
  componentWillMount: function() {
    this.state.position = [this.state.localLat, this.state.localLng]
    this.geoFire = new GeoFire(geofireRef);
    // Actions.getAllMixesLocations();
  },
  componentDidMount:function() {
    Actions.getLocation();
  },
  componentWillReceiveProps: function() {
    this.state.position = [this.state.localLat, this.state.localLng];
    this.geoQuery = this.geoFire.query({
      center: this.state.position,
      // radius: 0.5
      radius: 10
    });
    this.getLocalLocations();
  },
  render: function() {
    if (this.state.localLat === 0 && this.state.localLng === 0) {
      return <div className="map-container">
        <div className="loading-area">
          <h1>Loading location...</h1>
        </div>
      </div>
    } else {
      return <div className='map-container'>
          <ReactLeaflet.Map 
          center={this.state.position} 
          zoom={this.state.zoom}
          minZoom={this.state.minzoom}
          maxZoom={this.state.maxzoom} 
          zoomControl={false}
          dragging={true}
          >
            <ReactLeaflet.TileLayer
              attribution="&copy; <a href='https://www.mapbox.com/map-feedback/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
              url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mb}
              id='mapbox.light'
            />
            <ReactLeaflet.Circle center={this.state.position} radius={10000} color={'rgba(190,190,190,0.0)'} fillColor = {'rgba(190,190,190,1.0)'}/>
            {this.renderSingleMarkers()}
            {this.renderMultiMarkers()}
          </ReactLeaflet.Map>
      </div>
    }
  },
  getLocalLocations: function() {
    this.geoQuery.on("key_entered", function(key, location, distance) {
      var local_mixes = ViewMixStore.state.local_mix_locations;
      if(local_mixes.indexOf(key) === -1){
        ViewMixStore.setState({
          local_mix_locations: ViewMixStore.state.local_mix_locations.concat([key])
        });
      }
    });
  },
  renderSingleMarkers: function() {
    var pub_solos = [];
    var tmicon = Leaflet.icon({
      iconUrl: 'imgs/map-icon.png',
      iconRetinaUrl: 'imgs/map-icon@2x.png',
      iconSize: [30, 30]
    });
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
        icon = {tmicon}
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
      // console.log('location_tm_key: ' + location_tm_key + ' / place: ' + place);
      var tmicon = Leaflet.divIcon({
        className: 'marker-multi-icon',
        html: count
      });
      pub_multis.push(
        <ReactLeaflet.Marker 
        position={markerPosition} 
        key={location_tm_key}
        place={place}
        onClick={this.handleMultiMarkerClick.bind(this, {location_tm_key, place})}
        icon = {tmicon}
        >
        </ReactLeaflet.Marker>
      );
    }
    return pub_multis;
  },
  handleSinglePopupClick: function(id) {
    var mixRoute = id.key;
    hashHistory.push({
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
    hashHistory.push({
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
