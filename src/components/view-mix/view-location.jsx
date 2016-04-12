var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');

var LocMixesStore = require('../../stores/viewTMLocation-store');

var MixListItem = require('./mix-list-item');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(LocMixesStore),
    ReactFire
  ],
  componentWillMount: function() {
    LocMixesStore.setState({location_key: this.props.params.id });
    this.all_ref = new Firebase(fireUrl);
    this.all_ref.on('value', this.handleMixLocLoaded);
  },
  render: function() {
    return <div>
      <h1>THIS IS A LOCATION PAGE for {this.state.place_name}</h1>
      <ul>
        {this.renderMixList()}
      </ul>
    </div>
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
  renderMixList: function(){
    mix_list_render = [];
    for (var key in this.state.mix_list) {
      mix = this.state.mix_list[key];
      mix_list_render.push(
        <MixListItem id={mix.id} artists={mix.artists} tags={mix.tags}>
        </MixListItem>
      );
    }
    return mix_list_render;
  },
  handleMixLocLoaded: function(data){
    this.location_ref = this.all_ref.child('locations/' + this.state.location_key);
    this.location_ref.on('value', this.loadLocationDetails)
    this.mix_ref = this.all_ref.child('mixes');
    this.mix_ref.on('value', this.getMixListItems);
  },
  loadLocationDetails: function(location) {
    location = location.val();
    LocMixesStore.setState({
      place_name: location.drop_name
    });
  }
});