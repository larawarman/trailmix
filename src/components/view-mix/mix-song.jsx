var React = require('react');
var StateMixin = require('reflux-state-mixin');

var AudioStore = require('../../stores/audioPlayer-store');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  render: function() {
    return <li>
      <img src={this.props.song.images[2].url} />
      <h4>{this.props.song.track_name}</h4>
      <p>by {this.props.song.artistJoined}</p>
      <div className = "song-play" onClick={this.addSongToPlay}>play song</div>
    </li>
  },
  addSongToPlay:function() {
    var mainQueue = this.state.queue_song_ids;
    // console.log('old queue: ' + mainQueue);
    var songToAdd = this.props.song.spotify_id;
    // console.log('song to add: ' + songToAdd);
    mainQueue.unshift(songToAdd);
    // console.log('new queue: ' + mainQueue);
    AudioStore.setState({queue_song_ids: mainQueue});
  }
});