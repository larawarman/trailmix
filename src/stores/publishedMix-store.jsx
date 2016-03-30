var Reflux = require('reflux');
var Actions = require('../actions');
var StateMixin = require('reflux-state-mixin');
var Api = require('../utils/api');

var MixSongsStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function(){
    return{
      all_mixes: {},
      published_mixes: []
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.mixSongs !== prevState.mixSongs){
      //console.log('updated: ' + this.state.mixSongs);
    }
  }
});