var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/location-store');
var PublishedMixStore = require('../../stores/publishedMix-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var ReactLeaflet = require('react-leaflet');

// var MixMarker = require('./mix-markers');

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
  },
  render: function() {
    var position = [this.state.localLat, this.state.localLng];
    return <div>
      <div className='map-container'>
        <ReactLeaflet.Map center={position} zoom={this.state.zoom}>
          <ReactLeaflet.TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        </ReactLeaflet.Map>
      </div>
    </div>
  },
  handleDataLoaded: function(snapshot) {
    //console.log(snapshot.val());
    PublishedMixStore.setState({all_mixes: snapshot.val()});
  },
  renderMixMarkers: function() {
    var pub_mixes = [];
    for (var key in this.state.all_mixes){
      var mix = this.state.all_mixes[key];
      if(mix.published === true){
        pub_mixes.push(
          <ReactLeaflet.Marker 
          position={[mix.location.latitude, mix.location.longitude]} 
          key={mix.key}>
            <ReactLeaflet.Popup>
              <span>{this.props.mix.location.label}</span>
            </ReactLeaflet.Popup>
          </ReactLeaflet.Marker>
        );
      }
    }
    return pub_mixes
  }
});
