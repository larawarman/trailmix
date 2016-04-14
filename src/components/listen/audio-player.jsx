var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');
var AudioStore = require('../../stores/audioPlayer-store');
var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  getInitialState: function() {
    return {
      song_queue: [],
      song_play_num: 0,
      now_playing_url: '',
      now_playing_track: '',
      now_playing_artist: ''
    }
  },
  componentWillMount: function() {
    this.song_ref = new Firebase(fireUrl + '/songs');
    this.song_ref.on('value', this.getSongQueue);
  },
  componentWillUpdate: function() {
    console.log('updating queue: ' + this.state.queue_song_ids);
    this.loadSong();
  },
  componentWillReceiveProps: function() {
    console.log('receiving new props: ' + this.state.queue_song_ids);
    this.getSongQueue();
    this.loadSong();
  },
  componentDidUpdate: function() {
    this.loadSong();
  },
  render: function() {
    return <div className="main-audio-player" id="main-player-container">
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
  },
  getSongQueue: function(){
    // console.log('getInitSongQueue');
    var songs_queue = [];
    for(var key in this.state.queue_song_ids){
      songid = this.state.queue_song_ids[key];
      this.song_ref.orderByChild('spotify_id').equalTo(songid).once('value', function(songs){
        songs.forEach(function(song){
          song= song.val();
          // console.log(song);
          songs_queue.push({
            play_url: song.spotify_preview_url,
            play_track: song.track_name,
            play_artist: song.artistJoined,
          });
        });
      });
    }
    this.setState({
      song_queue: songs_queue,
      song_play_num: 0,
      now_playing_url: songs_queue[0].play_url,
      now_playing_track: songs_queue[0].play_track,
      now_playing_artist: songs_queue[0].play_artist
    });
    // this.loadSong();
    // AudioStore.setState({song_queue: songs_queue});
  },
  loadSong: function() {
    var audio = document.getElementById('player-main');
    audio.load();
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
    var audio = document.getElementById('player-main');
    audio.pause();
    var new_num = this.state.song_play_num + 1;
    if (new_num < this.state.song_queue.length) {
      this.setState({
        song_play_num: new_num,
        now_playing_url: this.state.song_queue[new_num].play_url,
        now_playing_track: this.state.song_queue[new_num].play_track,
        now_playing_artist: this.state.song_queue[new_num].play_artist
      }, function() {
        audio.load();
        audio.play();
      });
    }
  },
  handlePrev:function() {
    var audio = document.getElementById('player-main');
    audio.pause();
    var new_num = this.state.song_play_num - 1;
    if (new_num >= 0) {
      this.setState({
        song_play_num: new_num,
        now_playing_url: this.state.song_queue[new_num].play_url,
        now_playing_track: this.state.song_queue[new_num].play_track,
        now_playing_artist: this.state.song_queue[new_num].play_artist
      }, function() {
        audio.load();
        audio.play();
      });
    }
  }
});
