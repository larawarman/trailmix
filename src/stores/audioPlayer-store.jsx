var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var AudioStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function(){ 
    return {
      queue_songs: [
        '-KF7307NqF5Vcfea9mrR', //War On Drugs
        '-KF7324_GEdiDepkWask', //Wilco
        '-KF733JHAl-EWafXXD5b', //Sylvan Esso
        '-KF73O5u3w8yU8gkOCDo' //Steve Gunn
      ]
    }
  },
  storeDidUpdate: function(prevState) {
    // if(this.state.single_mixes !== prevState.single_mixes){
    //   Actions.setSingleMixes();
    // }
  },
});