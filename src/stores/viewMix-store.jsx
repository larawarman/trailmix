var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

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
      all_locations: {},

      //MAPPED MIXES
      multi_mixes: [],
      single_mixes: [],
      solos_published: [],
      multis_published: [],

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
    if(this.state.single_mixes !== prevState.single_mixes){
      Actions.setSingleMixes();
    }
    if(this.state.multi_mixes !== prevState.multi_mixes || this.state.all_mixes !== prevState.all_mixes){
      Actions.setMultiMixes();
    }
  },
  getAllMixesLocations: function() {
    this.mix_loc_ref = new Firebase(fireUrl);
    this.mix_loc_ref.on('value', this.handleMixLocLoaded);
  },
  setSingleMixes: function() {
    var solos_published = [];
    for (var key in this.state.single_mixes){
      mix = this.state.single_mixes[key];
      key = mix;
      this.fb_mixesRef.child(mix).on('value', function(mix){
        mix = mix.val();
        if (mix.published === true) {
          var markerPosition = [mix.location.drop_lat, mix.location.drop_lng]
          if(mix.tags){
            var tags = mix.tags.join(' ');
          } else {
            var tags = null;
          }
          var place = mix.location.drop_name;
          solos_published.push({
            key, place, tags, markerPosition
          });
        }
      });
    }
    ViewMixStore.setState({solos_published: solos_published});
  },
  setMultiMixes: function() {
    var multis_published = [];
    for (var key in this.state.multi_mixes){
      mix = this.state.multi_mixes[key];
      id = mix; //gmaps_id where there is more than one mix
      this.fb_mixesRef.orderByChild('location/drop_gmaps_id').equalTo(id).on('value', function(mixes){
        var mixcount = 0;
        var drop_gmaps_id = id;
        var drop_lat;
        var drop_lng;
        var drop_loc_tmid;
        var drop_name;
        mixes.forEach(function(themix){
          themix = themix.val();
          location_tm_key = themix.location.location_tm_key;
          drop_lat = themix.location.drop_lat;
          drop_lng = themix.location.drop_lng;
          drop_name = themix.location.drop_name;
          if (themix.published === true) {
            mixcount ++;
          }
        })
        multis_published.push({
          drop_gmaps_id, drop_name, location_tm_key, drop_lat, drop_lng, mixcount
        });
      });
    }
    ViewMixStore.setState({multis_published : multis_published});
  },
  handleMixLocLoaded:function(data) {
    this.fb_mixesRef = this.mix_loc_ref.child('mixes');
    this.fb_mixesRef.on('value', this.handleAllMixesLoaded);
    this.locationsRef = this.mix_loc_ref.child('locations');
    this.segmentLocations(data);
  },
  handleAllMixesLoaded:function(mixes) {
    ViewMixStore.setState({all_mixes: mixes.val()});
  },
  segmentLocations: function(data) {
    var singles = [];
    var multis = [];
    data.child('locations').forEach(function(location){
      var num_mixes = location.child('mixes_here').numChildren();
      if (num_mixes > 1) {
        multis.push(location.child('drop_gmaps_id').val());
      } else {
        location.child('mixes_here').forEach(function(mix){
          singles.push(mix.val());
        });
      }
    });
    ViewMixStore.setState({
      multi_mixes: multis,
      single_mixes: singles
    });
  },
  getMixData: function(id) {
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + id);
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
    this.setState({
      the_mix: mix,
      mix_place: mix.location.drop_name,
      mix_tags: mix.tags,
      mixSongs: mix.songs,
      mixImgs: albums
    });
  }
});