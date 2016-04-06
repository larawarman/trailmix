var React = require('react');
var update = require('react-addons-update');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var Api = require('../utils/api');

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
    // if(this.state.mixSongs !== prevState.mixSongs){
    //   //console.log('updated: ' + this.state.mixSongs);
    // }
    if(this.state.single_mixes !== prevState.single_mixes){
      Actions.setSingleMixes();
    }
    if(this.state.multi_mixes !== prevState.multi_mixes){
      // console.log('updated multi: ' + this.state.multi_mixes);
    }
  },
  getAllMixes: function() {
    this.fb_mixesRef = new Firebase(fireUrl + '/mixes/');
    this.fb_mixesRef.on('value', this.handleAllMixesLoaded);
  },
  getAllLocations: function() {
    this.locationsRef = new Firebase(fireUrl + '/locations/');
    this.locationsRef.on('value', this.handleAllLocationsLoaded);
  },
  setSingleMixes: function() {
    //querying /mixes, for each key in single_mixes, return:
    //the lat/lng, the title, the tags
    var solos_published = []
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
          // console.log(key);
          solos_published.push({
            // key: {key},
            // place: {place},
            // tags: {tags},
            // markerPosition: {markerPosition}
            key, place, tags, markerPosition
          });
        }
      });
    }
    ViewMixStore.setState({solos_published: solos_published});
  },
  setMultiMixes: function() {
    //multi mixes are always going to share a gmaps id
    //querying /mixes, for each gmaps id in multi_mixes state, return:
    //the mix count, the lat/lng, the location key (to be used for link) 
    // this.mixes_ref = new Firebase(fireUrl + '/mixes/');
    // this.mixes_ref.on('value')
    // this.mixes_ref.child()
    // for (var key in this.state.multi_mixes) {
    //   mix = this.state.multi_mixes[key];
    //   console.log('multi!');
    //   this.mixes_ref.child(mix).update({solo: false});
    // }
  },
  handleAllMixesLoaded:function(mixes) {
    ViewMixStore.setState({all_mixes: mixes.val()});
  },
  handleAllLocationsLoaded: function(locations) {
    var singles = [];
    var multis = [];
    locations.forEach(function(location){
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
    // this.setMultiMixes();
    // this.setSingleMixes();
  },
  handleLocationsLoaded:function(snapshot) {
    ViewMixStore.setState({all_locations: snapshot.val()});
  },
  getMixData: function(id) {
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + id);
    // this.bindAsObject(this.fb_mixRef, 'the_mix');
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
    // console.log(mix.location.name);
    this.setState({
      the_mix: mix,
      mix_place: mix.location.drop_name,
      mix_tags: mix.tags,
      mixSongs: mix.songs,
      mixImgs: albums
    });
  }
});