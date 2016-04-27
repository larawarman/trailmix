var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var AudioStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function(){ 
    return {
      //create new queue of just spotify ids
      queue_song_ids: [],

      //find song info for all ids
      song_queue: [],
      song_play_num: 0,
      now_playing_url: '',
      now_playing_track: '',
      now_playing_artist: '',
      now_playing_spotify_id: '',
      // now_playing_decorator: false

      //timing stuff
      poll_interval: 0
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.queue_song_ids !== prevState.queue_song_ids){
      Actions.getSongsFromDB();
    }
    if(this.state.song_queue !== prevState.song_queue) {
      if (this.state.now_playing_spotify_id == '') {
        Actions.getSongPlayInfo(this.state.song_play_num);
        Actions.loadSong();
      }
    }
    if(this.state.song_play_num !== prevState.song_play_num) {
      Actions.getSongPlayInfo(this.state.song_play_num);      
      Actions.loadSong();
    }
  },
  loadSong: function() {
    var audio = document.getElementById('player-main');
    audio.load();
    audio.play();
    audio.addEventListener('ended', function(){
      Actions.handleControlsNext();
    });
    audio.ontimeupdate = function() {
      document.getElementById('seekbar').value = this.currentTime / this.duration;
    }
  },
  getSongPlayInfo: function(track_num) {
    var queue = this.state.song_queue;
    AudioStore.setState({song_play_num: track_num});
    for (var key in queue) {
      if (key == track_num) {
        AudioStore.setState({
          now_playing_url: queue[track_num].play_url,
          now_playing_track: queue[track_num].play_track,
          now_playing_artist: queue[track_num].play_artist,
          now_playing_spotify_id: queue[track_num].play_spotify_id
        });
      }
    }
  },
  handleControlsPlay:function() {
    var audio = document.getElementById('player-main');
    audio.play();
    audio.addEventListener('ended', function(){
      Actions.handleNext();
    });
  },
  handleControlsPause:function() {
    var audio = document.getElementById('player-main');
    audio.pause();
  },
  handleControlsNext:function() {
    var new_num = this.state.song_play_num + 1;
    if (new_num < this.state.song_queue.length) {
      AudioStore.setState({
        song_play_num: new_num
      });
    }
  },
  handleControlsPrev:function() {
    var new_num = this.state.song_play_num - 1;
    if (new_num >= 0) {
      AudioStore.setState({
        song_play_num: new_num
      });
    }
  },
  getSongsFromDB: function() {
    this.song_ref = new Firebase(fireUrl + '/songs');
    this.song_ref.on('value', Actions.getNewSongQueue);
  },
  getNewSongQueue: function(){
    var songs_queue = [];
    for(var key in this.state.queue_song_ids){
      songid = this.state.queue_song_ids[key];
      this.song_ref.orderByChild('spotify_id').equalTo(songid).once('value', function(songs){
        songs.forEach(function(song){
          song= song.val();
          songs_queue.push({
            play_url: song.spotify_preview_url,
            play_track: song.track_name,
            play_artist: song.artistJoined,
            play_spotify_id: song.spotify_id
          });
        });
      });
    }
    AudioStore.setState({
      song_queue: songs_queue
    });
  }
});