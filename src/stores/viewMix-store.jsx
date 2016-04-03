var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var Api = require('../utils/api');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var ViewMixStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store, ReactFire],
  listenables: [Actions],
  getInitialState: function(){
    return{
      //MIXES
      all_mixes: {},

      //THE MIX
      the_mix: {},
      mix_place: '',
      mix_time: '',
      mix_tags: [],
      mixSongs: {},
      mixImgs: []
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.mixSongs !== prevState.mixSongs){
      //console.log('updated: ' + this.state.mixSongs);
    }
  },
  getAllMixes: function() {
    this.fb_mixesRef = new Firebase(fireUrl + '/mixes/');
    // this.bindAsObject(this.fb_mixesRef, 'all_mixes');
    this.fb_mixesRef.on('value', this.handleAllMixesLoaded);
  },
  handleAllMixesLoaded:function(snapshot) {
    ViewMixStore.setState({all_mixes: snapshot.val()});
  },
  getMixData: function(id) {
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + id);
    // this.bindAsObject(this.fb_mixRef, 'the_mix');
    this.fb_mixRef.on('value', this.handleMixDataLoaded);
  },
  handleMixDataLoaded: function(snapshot) {
    var mix = snapshot.val();
    var albums = [];
    for (var key in mix.songs){
      var song = mix.songs[key];
      song.key = key;
      imageUrl = song.images[0].url;
      albums.push(imageUrl);
    }
    console.log(mix.location.name);
    this.setState({
      the_mix: mix,
      mix_place: mix.location.name,
      mix_tags: mix.tags,
      mixSongs: mix.songs,
      mixImgs: albums
    });
  }
});