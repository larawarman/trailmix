var Reflux = require('reflux');
var Actions = require('../../actions');
var StateMixin = require('reflux-state-mixin');

var MixSongsStore = module.exports = Reflux.createStore({
  listenables: [Actions],
  getInitialState: function(){
    return{
      mixSongs: {}
    }
  },
  getSongsFromMix: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
  }
});