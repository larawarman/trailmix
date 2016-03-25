var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var MixSongsStore = require('../../stores/make-mix/mixSongs-store');
var SongArea = require('./song-area');
var MixListItem = require('./mix-list-item');
var MixArt = require('./mix-art');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(MixSongsStore),
    ReactFire
  ],
  componentWillMount: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
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
          <ul className="mix-area">
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
    return songs
  },
  handleDataLoaded: function(snapshot) {
    MixSongsStore.setState({mixSongs: snapshot.val()});
  }
});