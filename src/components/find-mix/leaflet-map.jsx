var React = require('react');

var Router = require('react-router');
var Link = Router.Link;
var browserHistory = Router.browserHistory;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/location-store');
var PublishedMixStore = require('../../stores/publishedMix-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var ReactLeaflet = require('react-leaflet');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(LocationStore),
    StateMixin.connect(PublishedMixStore),
    ReactFire
  ],
  getInitialState: function() {
    return{
      zoom: 50,
      clicked_key: ''
    }
  },
  componentWillMount: function() {
    this.fb_mixesRef = new Firebase(fireUrl + '/mixes/');
    this.bindAsObject(this.fb_mixesRef, 'all_mixes');
    this.fb_mixesRef.on('value', this.handleDataLoaded);
  },
  render: function() {
    var position = [this.state.localLat, this.state.localLng];
    var mb = 'pk.eyJ1IjoibGFyYXdhcm1hbiIsImEiOiJjaW05ZDc3ZHEwM21qdG5tNm1lNnc5enBiIn0.5qqJjeDHM2t7FKHoHWlu2Q';
    return <div>
      <div className='map-container'>
        <ReactLeaflet.Map center={position} zoom={this.state.zoom}>
          <ReactLeaflet.TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            //url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            url={'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mb}
            id='mapbox.light'
          />
          {this.renderMixMarkers()}
        </ReactLeaflet.Map>
      </div>
    </div>
  },
  handleDataLoaded: function(snapshot) {
    PublishedMixStore.setState({all_mixes: snapshot.val()});
  },
  renderMixMarkers: function() {
                //<ReactLeaflet.Popup key={key}>
              //<span key={key} >
                //{mix.location.label}
              //</span>
            //</ReactLeaflet.Popup>
    var pub_mixes = [];
    for (var key in this.state.all_mixes){
      var mix = this.state.all_mixes[key];
      mix.key = key;
      if(mix.published === true){
        var markerPosition = [mix.location.lat, mix.location.lng];
        //console.log(markerPosition);
        pub_mixes.push(
          <ReactLeaflet.Marker 
          position={markerPosition} 
          key={key}
          // bindPopup={'<a href="http://google.com>google</a>'}
          //onClick={browserHistory.push('/make-mix/new')}
          onClick={this.handlePopup(key)}
          >

          </ReactLeaflet.Marker>
        );
      }
    }
    return pub_mixes
  },
  handlePopup: function(key) {
    //this.setState({'clicked_key': key});
    // console.log(key);

  }
});
