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
      exists: '',
      drop_name: '',
      drop_lat: '',
      drop_lng: '',
      drop_label: '',
      drop_gmaps_id: '',
      drop_gmaps_types: '',
      mixes_here: []
      // lat: '',
      // lng: '',
      // gmaps_place_id: '',
      // types: '',
      // label: '',
      // name: ''
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
  getPlaceName: function(id) {
    var hidemap = new google.maps.Map(document.getElementById('hidemap'));  
    var service = new google.maps.places.PlacesService(hidemap);
    var name='';
    service.getDetails({ placeId: id}, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        LocationStore.setState({drop_name: place.name});
      }
    });
  },
  storeDidUpdate: function(prevState) {
    if(this.state.name !== prevState.name) {
      // console.log(this.state.name + 'updated');
    }
  }
});