var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

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
  },
  getDB: function() {
    this.all_ref = new Firebase(fireUrl);
    this.all_ref.on('value', this.handleMixLocLoaded);
  },
  handleMixLocLoaded: function(data){
    this.location_ref = this.all_ref.child('locations/' + this.state.location_key);
    this.location_ref.on('value', Actions.loadLocationDetails)
    this.mix_ref = this.all_ref.child('mixes');
    this.mix_ref.on('value', Actions.getMixListItems);
  },
  loadLocationDetails: function(location) {
    location = location.val();
    LocMixesStore.setState({
      place_name: location.drop_name
    });
  },
  getMixListItems: function() {
    LocMixesStore.setState({mixes_loaded: true});
    var mix_list = [];
    this.mix_ref.orderByChild('location/location_tm_key').equalTo(this.state.location_key).on('value', function(mixes) {
      mixes.forEach(function(mix){
        if (mix.val().published){
          var id = mix.key();
          mix = mix.val();
          var tags = mix.tags;
          var songs = mix.songs;
          var artists = [];
          for (var key in mix.songs) {
            artists.push(mix.songs[key].artistJoined);
          }            
          mix_list.push({
            id: id,
            tags: tags,
            artists: artists
          });
        } else {
          return null
        }
      });
    });
    LocMixesStore.setState({mix_list : mix_list});
  },
});