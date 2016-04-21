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
      queue_song_ids: [
        // '2PlGP8KVcHZvayqR8JPLtY', //Future Islands
      ],

      //find song info for all ids
      song_queue: [],
      song_play_num: 0,
      now_playing_url: '',
      now_playing_track: '',
      now_playing_artist: ''
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.queue_song_ids !== prevState.queue_song_ids){
      console.log('queue_song_ids state update');
      Actions.loadSong();
      Actions.getSongsFromDB();
    }
    if(this.state.song_queue !== prevState.song_queue) {
      console.log('song_queue state update');
      Actions.loadSong();
    }
  },
  loadSong: function() {
    var audio = document.getElementById('player-main');
    audio.load();
    audio.play();
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
          });
        });
      });
    }
    AudioStore.setState({
      song_queue: songs_queue,
      song_play_num: 0,
      now_playing_url: songs_queue[0].play_url,
      now_playing_track: songs_queue[0].play_track,
      now_playing_artist: songs_queue[0].play_artist
    });
  },
  // addSongToPlay:function() {
  //   var theQueue = this.state.queue_song_ids;
  //   // var songToAdd = spotify_id;
  //   theQueue.unshift(spotify_id);
  //   console.log('single play clicked: ' + theQueue);
  //   this.setState({queue_song_ids: theQueue});
  // }
});