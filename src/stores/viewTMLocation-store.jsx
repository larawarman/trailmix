var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

// var ReactFire = require('reactfire');
// var Firebase = require('firebase');
// var fireUrl = 'https://trailmix0.firebaseio.com/';

var LocMixesStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function(){
    return{
      location_key: '',
      mixes_loaded: false,
      place_name: '',
      mix_list: [],

    }
  },
  storeDidUpdate: function(prevState) {
    // if(this.state.single_mixes !== prevState.single_mixes){
    // }
  }
});