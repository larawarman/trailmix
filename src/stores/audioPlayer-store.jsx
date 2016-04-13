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
      queue_song_ids: [
        '1LAzF3sa7k3QrOKtpCVgLJ', //Widowspeak
        '390AWnOn2rfe9FzQjYmxIH', //Chris Isaak
        '2PlGP8KVcHZvayqR8JPLtY', //Future Islands
        '2TaUMeMnlKYhso8C8txtzl' //Amen Dunes
      ],
      now_playing_url: '',
      now_playing_track: '',
      now_playing_artist: '',
      song_queue: [],
      song_play_num: 0
    }
  },
  // getSongPreviewUrl: function(spotify_id){
  //   this.song_ref = new Firebase(fireUrl + '/songs');
  //   this.song_ref.orderByChild('spotify_id').equalTo(spotify_id).once('value', function(songs){
  //     songs.forEach(function(song){
  //       song= song.val();
  //       AudioStore.setState({
  //         now_playing_url: song.spotify_preview_url,
  //         now_playing_track: song.track_name,
  //         now_playing_artist: song.artistJoined
  //       });
  //     })
  //   })
  // },
  
  storeDidUpdate: function(prevState) {
    if(this.state.preview_url !== prevState.preview_url){
      //console.log(this.state.preview_url);
      //Actions.updateAudioSource();
    }
  },
});