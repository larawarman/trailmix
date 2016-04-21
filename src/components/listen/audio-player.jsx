var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');
var AudioStore = require('../../stores/audioPlayer-store');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var AudioQueue = require('./audio-queue');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  render: function() {
    var queue = this.state.queue_song_ids;
    if (queue.length > 0) {
      return <div className="main-audio-player" id="main-player-container">
        <AudioQueue />
        <p>{this.state.now_playing_track} by {this.state.now_playing_artist}</p>
        <div className='audio-controls'>
          <div className="play-btn" onClick={this.handlePlay}>play</div>
          <div className="pause-btn" onClick={this.handlePause}>pause</div>
          <div className="next-btn" onClick={this.handleNext}>next</div>
          <div className="prev-btn" onClick={this.handlePrev}>prev</div>
        </div>
        <audio id="player-main">
          <source id="mp3-src" src={this.state.now_playing_url} type="audio/mpeg" />
        </audio>
      </div>
    } else {
      return null
    }
  },
  handlePlay:function() {
    var audio = document.getElementById('player-main');
    audio.play();
  },
  handlePause:function() {
    var audio = document.getElementById('player-main');
    audio.pause();
  },
  handleNext:function() {
    var new_num = this.state.song_play_num + 1;
    if (new_num < this.state.song_queue.length) {
      AudioStore.setState({
        song_play_num: new_num,
        now_playing_url: this.state.song_queue[new_num].play_url,
        now_playing_track: this.state.song_queue[new_num].play_track,
        now_playing_artist: this.state.song_queue[new_num].play_artist,
        now_playing_spotify_id: this.state.song_queue[new_num].play_spotify_id
      });
    }
  },
  handlePrev:function() {
    var new_num = this.state.song_play_num - 1;
    if (new_num >= 0) {
      AudioStore.setState({
        song_play_num: new_num,
        now_playing_url: this.state.song_queue[new_num].play_url,
        now_playing_track: this.state.song_queue[new_num].play_track,
        now_playing_artist: this.state.song_queue[new_num].play_artist,
        now_playing_spotify_id: this.state.song_queue[new_num].play_spotify_id
      });
    }
  }
});
