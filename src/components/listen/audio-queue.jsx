var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var AudioStore = require('../../stores/audioPlayer-store');

var Actions = require('../../actions');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  render: function() {
    return <div className="queue-view">
      <ul className = "queue-view-songs" id="song-queue">
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
        id={s_id} 
        className={(s_id==this.state.now_playing_spotify_id ? 'active-playing' : '')}>
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
      if(this.state.song_queue[key].play_spotify_id == s_id) {
        Actions.getSongPlayInfo(key);
      }
    }
  },
  handleQueueRemoveClick: function(id) {
    var s_id = id.s_id;
    var new_song_queue = [];
    for (var key in this.state.song_queue) {
      new_song_queue.push(this.state.song_queue[key]);
    }
    var removeKey = '';
    for (var key in new_song_queue) {
      if (new_song_queue[key].play_spotify_id == s_id) {
        removeKey = key;
      }
    }
    var new_queue_song_ids = [];
    for (var key in this.state.queue_song_ids){
      new_queue_song_ids.push(this.state.queue_song_ids[key]);
    }
    new_song_queue.splice(removeKey, 1);
    AudioStore.setState({song_queue: new_song_queue});
    new_queue_song_ids.splice(removeKey, 1);
    AudioStore.setState({queue_song_ids: new_queue_song_ids});
  }
});