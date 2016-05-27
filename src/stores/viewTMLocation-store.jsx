var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var ReactFire = require('reactfire');
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
      num_mixes: '',

    }
  },
  storeDidUpdate: function(prevState) {
    // if(this.state.single_mixes !== prevState.single_mixes){
    // }
  },
  getMixLoc: function(data){
    this.location_ref = locationsRef.child(this.state.location_key);
    this.location_ref.on('value', Actions.loadLocationDetails);
    Actions.getMixListItems();
  },
  loadLocationDetails: function(location) {
    LocMixesStore.setState({num_mixes: location.child('mixes_here').numChildren()});
    location = location.val();
    LocMixesStore.setState({
      place_name: location.drop_name
    });
  },
  getMixListItems: function() {
    LocMixesStore.setState({mixes_loaded: true});
    var mix_list = [];
    mixesRef.orderByChild('location/location_tm_key').equalTo(this.state.location_key).on('value', function(mixes) {
      mixes.forEach(function(mix){
        if (mix.val().published){
          var id = mix.key;
          mix = mix.val();
          var tags = mix.tags;
          var songs = mix.songs;
          var artists = [];
          var images = [];
          var date = mix.publish_date;
          for (var key in mix.songs) {
            artists.push(mix.songs[key].artistJoined);
            images.push(mix.songs[key].images[1].url);
          }            
          mix_list.push({
            id: id,
            tags: tags,
            artists: artists,
            images: images,
            date: date
          });
        } else {
          return null
        }
      });
    });
    LocMixesStore.setState({mix_list : mix_list});
  },
});