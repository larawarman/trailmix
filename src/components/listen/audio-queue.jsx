var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var AudioStore = require('../../stores/audioPlayer-store');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  render: function() {
    return <div className="queue-view">
      <ul className = "queue-view-songs">
        {this.renderQueueSongs()}
      </ul>
    </div>
  },
  renderQueueSongs: function() {
    var songs = [];
    var nowPlaying = this.state.now_playing_spotify_id;
    for (var key in this.state.song_queue) {
      song = this.state.song_queue[key];
      key = song.play_spotify_id;
      s_id = song.play_spotify_id;
      songs.push(
        <li 
        key={key} 
        spotify_id={s_id}
        id={s_id} >
          <div className='queue-song-play' onClick={this.handleQueuePlayClick.bind(this, {s_id})}>
            {song.play_track} by {song.play_artist}
            <div>
              PLAY
            </div>
          </div>
          <div className='queue-song-delete' onClick={this.handleQueueRemoveClick.bind(this, {s_id})}>REMOVE</div>
        </li>
      );
    }
    return songs;
  },
  handleQueuePlayClick:function(id) {
    var s_id = id.s_id;
    for (var key in this.state.song_queue) {
      if(this.state.song_queue[key].play_spotify_id === s_id) {
        AudioStore.setState({
          song_play_num: key,
          now_playing_url: this.state.song_queue[key].play_url,
          now_playing_track: this.state.song_queue[key].play_track,
          now_playing_artist: this.state.song_queue[key].play_artist,
          now_playing_spotify_id: this.state.song_queue[key].play_spotify_id
        });
        return false
      }
    }
  },
  handleQueueRemoveClick: function(id) {
    var s_id = id.s_id;
    var queue = this.state.song_queue;
    for (var key in queue) {
      if(this.state.song_queue[key].play_spotify_id === s_id) {
        queue.splice(key, 1);
        AudioStore.setState({song_queue: queue});
        document.getElementById(s_id).style.display = 'none';
      }
    }
  }
});