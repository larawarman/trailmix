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
        '2PlGP8KVcHZvayqR8JPLtY', //Future Islands
      ],
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.queue_song_ids !== prevState.queue_song_ids){
      console.log('queue_song_ids state update');
      // this.getSongQueue();
    }
  },
  addSongToPlay:function() {
    var theQueue = this.state.queue_song_ids;
    // var songToAdd = spotify_id;
    theQueue.unshift(spotify_id);
    console.log('single play clicked: ' + theQueue);
    this.setState({queue_song_ids: theQueue});
  }
});