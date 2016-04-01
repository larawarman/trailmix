var Reflux = require('reflux');
var Actions = require('../actions');
var StateMixin = require('reflux-state-mixin');
var Api = require('../utils/api');

var MixSongsStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function(){
    return{
      //all mixes map view
      all_mixes: {},
      // published_mixes: [],
      
      //single mix view
      the_mix: {},
      mix_place: '',
      mix_time: '',
      mix_tags: [],
      mix_songs: []
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.mixSongs !== prevState.mixSongs){
      //console.log('updated: ' + this.state.mixSongs);
    }
  }
});