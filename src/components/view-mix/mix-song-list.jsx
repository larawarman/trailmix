var React = require('react');
var StateMixin = require('reflux-state-mixin');

var ViewMixStore = require('../../stores/viewMix-store');
var MixSong = require('./mix-song');


module.exports = React.createClass({
  mixins: [ 
    StateMixin.connect(ViewMixStore)
  ],
  render: function() {
    return <ul>
      {this.renderMixSong()}
    </ul>
  },
  renderMixSong(){
    var songs = [];
    for (var key in this.state.mixSongs)  {
      var song = this.state.mixSongs[key];
      song.key = key;
      songs.push(
        <MixSong
        key={key}
        song={song}
        >
        </MixSong>
      );
    }
    return songs
  }
});