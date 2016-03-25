var Reflux = require('reflux');
var Actions = require('../../actions');
var StateMixin = require('reflux-state-mixin');

var MixSongsStore = module.exports = Reflux.createStore({
  listenables: [Actions],
  getInitialState: function(){
    return{
      mixSongs: {}
    }
  }
});