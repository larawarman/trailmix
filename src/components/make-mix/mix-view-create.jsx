var React = require('react');
var Reflux = require('reflux');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var StateMixin = require('reflux-state-mixin');

var MixSongsStore = require('../../stores/make-mix/mixSongs-store');
//var MixList = require('./mix-list');
var SongArea = require('./song-area');
var MixListItem = require('./mix-list-item');
var MixArt = require('./mix-art');

var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins:[
    StateMixin.connect(MixSongsStore),
    ReactFire
  ],
  componentWillMount: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
    this.fbsonglist.on('child_changed', this.handleChildChanged);
  },
  getInitialState: function() {
    return {
      // loaded: false
    }
  },
  render: function(){
    return <div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ul>
            {this.renderMixSongs()}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <SongArea />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <MixArt />
        </div>
      </div>
    </div>
  },
  renderMixSongs: function() {
    var songs = [];
    var index = 1;
    for (var key in this.state.mixSongs)  {
      var song = this.state.mixSongs[key];
      song.key = key;
      songs.push(
        <MixListItem
          song={song}
          key={key}
          index={index}
        />
      );
      index++;
    }
    return <div className="mix-area">
      {songs}
    </div>
  },
  handleDataLoaded: function(snapshot) {
    // this.setState({loaded: true});
    // MixSongsStore.setState({mixSongs: this.state.mixSongs});
  },
  handleChildChanged: function(snapshot) {
    console.log(snapshot);
    MixSongsStore.setState({mixSongs: this.state.mixSongs})
  }
});