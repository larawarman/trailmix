var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var MixSongsStore = require('../../stores/mixSongs-store');
var SongArea = require('./song-area');
var MixListItem = require('./mix-list-item');
var MixArt = require('./mix-art');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(MixSongsStore),
    ReactFire
  ],
  componentWillMount: function() {
    this.fb_songsRef = new Firebase(this.props.mix_url + '/songs/');
    this.bindAsObject(this.fb_songsRef, 'mixSongs');
    this.fb_songsRef.on('value', this.handleDataLoaded);
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
          <SongArea mix_url={this.props.mix_url} />
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