var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/location-store');
var PublishedMixStore = require('../../stores/publishedMix-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(LocationStore),
    StateMixin.connect(PublishedMixStore),
    ReactFire
  ],
  getInitialState: function() {
    return{
      zoom: 50
    }
  },
  componentWillMount: function() {
    this.fb_mixesRef = new Firebase(fireUrl + '/mixes/');
    this.bindAsObject(this.fb_mixesRef, 'all_mixes');
    this.fb_mixesRef.on('value', this.handleDataLoaded);
  // },
  // componentDidMount: function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibGFyYXdhcm1hbiIsImEiOiJjaW05ZDc3ZHEwM21qdG5tNm1lNnc5enBiIn0.5qqJjeDHM2t7FKHoHWlu2Q';
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v8', //hosted style id
      center: [-77.38, 39], // starting position
      zoom: 3 // starting zoom
    });
  },
  render: function() {
    return <div id="map">

    </div>
  },
  handleDataLoaded: function(snapshot) {
    PublishedMixStore.setState({all_mixes: snapshot.val()});
  },
  renderMixMarkers: function() {
    var pub_mixes = [];
    for (var key in this.state.all_mixes){
      var mix = this.state.all_mixes[key];
      mix.key = key;
      if(mix.published === true){
        var markerPosition = [mix.location.lat, mix.location.lng] 
        pub_mixes.push(
          <ReactLeaflet.Marker 
          position={markerPosition} 
          key={key}>
            <ReactLeaflet.Popup key={key}>
              <span key={key}>{mix.location.label}</span>
            </ReactLeaflet.Popup>
          </ReactLeaflet.Marker>
        );
      }
    }
    return pub_mixes
  }
});
