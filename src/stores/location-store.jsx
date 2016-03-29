var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var Actions = require('../actions');

var LocationStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function() {
    return {
      localLat: 0,
      localLng: 0,

      open: false,
      lat: '',
      lng: '',
      gmaps_place_id: '',
      types: '',
      label: ''
    }
  },
  getLocation: function() {
    var options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(this.getLocSuccess, this.getLocError, options);
  },
  getLocSuccess: function(pos) {
    var crd = pos.coords;
    this.setState({localLat: pos.coords.latitude, localLng: pos.coords.longitude});
  },
  getLocError: function(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
    if (err.code === 3) {
      this.getLocation();
    }
  },
  storeDidUpdate: function(prevState) {

  }
});