var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var CreateLocationStore = require('../stores/createLocation-store');
// var AudioPlayerStore = require('../stores/audioPlayer-store');

var FindMixMain = require('./find-mix/find-mix-main');
var AudioPlayer = require('./listen/audio-player');
var LeafletGeofireMap = require('./find-mix/leaflet-geofire-map');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(CreateLocationStore)
  ],
  componentWillMount: function() {
    CreateLocationStore.getLocation();
  },
  render: function() {
    return <div>
      <LeafletGeofireMap />
      {this.content()}
      <AudioPlayer />
    </div>
  },
  content: function() {
    if(this.props.children) {
      return this.props.children
    } else {
      return <div>
        <FindMixMain />
      </div>
    }
  }
});