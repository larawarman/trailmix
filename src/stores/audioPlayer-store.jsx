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
    if(this.state.song_queue !== prevState.song_queue || this.state.song_play_num !== prevState.song_play_num) {
      Actions.loadSong();
    }
    if(this.state.now_playing_spotify_id !== prevState.now_playing_spotify_id) {
      // Actions.nowPlayingDecorator();
    }
  },
  loadSong: function() {
    var audio = document.getElementById('player-main');
    audio.load();
    audio.play();
    audio.addEventListener('ended', function(){
      console.log('song ended after reload');
      Actions.handleNext();
    });
  },
  handlePlay:function() {
    var audio = document.getElementById('player-main');
    audio.play();
    audio.addEventListener('ended', function(){
      console.log('song ended initial play');
      Actions.handleNext();
    });
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
      song_queue: songs_queue,
      song_play_num: 0,
      now_playing_url: songs_queue[0].play_url,
      now_playing_track: songs_queue[0].play_track,
      now_playing_artist: songs_queue[0].play_artist,
      now_playing_spotify_id: songs_queue[0].play_spotify_id
    });
  },
  // nowPlayingDecorator: function() {

  // }
});