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
      queue_songs: [
        '1LAzF3sa7k3QrOKtpCVgLJ', //Widowspeak
        '390AWnOn2rfe9FzQjYmxIH', //Chris Isaak
        '2PlGP8KVcHZvayqR8JPLtY', //Future Islands
        '2TaUMeMnlKYhso8C8txtzl' //Amen Dunes
      ],
      now_playing: ''
    }
  },
  getSongPreviewUrl: function(spotify_id){
    this.song_ref = new Firebase(fireUrl + '/songs');
    this.song_ref.orderByChild('spotify_id').equalTo(spotify_id).once('value', function(songs){
      songs.forEach(function(song){
        song= song.val();
        AudioStore.setState({now_playing: song.spotify_preview_url});
      })
    })
  },
  loadSong: function() {
    var audio = document.getElementById('player-main');
    audio.load();
  },
  storeDidUpdate: function(prevState) {
    if(this.state.preview_url !== prevState.preview_url){
      //console.log(this.state.preview_url);
      //Actions.updateAudioSource();
    }
  },
});