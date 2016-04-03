var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var Api = require('../utils/api');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var MixSongsStore = module.exports = Reflux.createStore({
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

      //MAKE MIX SEARCH
      songResults: [], //songs that are the result of a song query
      showresults: null, //flag to show whether or not to show search results

      //CREATE MIX
      tags: [], //hashtags as an array
      
      mix_path: '' //path to the mix
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.mixSongs !== prevState.mixSongs){
      //console.log('updated: ' + this.state.mixSongs);
    }
  },
  queryTracks: function(query) {
    if (query === '') {
      this.setState({showresults:false});
    } else {
      this.setState({showresults:true});
      Api.get('q=' + query + '&type=track')
        .then(function(json){
          this.setState({songResults: json.tracks.items})
        }.bind(this));
    }
  },
  closeResults: function() {
    Actions.pauseAllAudio();
    this.setState({showresults:false});
  },
  pauseAllAudio: function() {
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
      audios[i].pause();
    }
  },
  playOneAudio: function() {
    //only play one audio at a time
    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
            }
        }
    }, true);
  },
  getMixData: function(id) {
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + id);
    // this.bindAsObject(this.fb_mixRef, 'the_mix');
    this.fb_mixRef.on('value', this.handleMixDataLoaded);
  },
  handleMixDataLoaded: function(snapshot) {
    var mix = snapshot.val();
    this.setState({
      the_mix: mix,
      mix_place: mix.location.label,
      mix_tags: mix.tags,
      mixSongs: mix.songs
    });
  }
});