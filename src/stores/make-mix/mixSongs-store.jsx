var Reflux = require('reflux');
var Actions = require('../../actions');
var StateMixin = require('reflux-state-mixin');
var Api = require('../../utils/api');

var MixSongsStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function(){
    return{
      mixSongs: {}, //songs that have been added to the mix
      songResults: [], //songs that are the result of a song query
      queryResults: false, //if a song query has been entered

      //data entered for each song
      track_name: '',
      artistJoined: '',
      artists_arr: [],
      images: [],
      external_ids: [],
      spotify_preview_url: '',
      spotify_id: '',
      spotify_href: '',
      spotify_popularity: '',
      spotify_uri: '',
      place_in_mix: 0
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.mixSongs !== prevState.mixSongs){
      // console.log('songs have changed');
    }
  },
  queryTracks: function(query) {
    Api.get('q=' + query + '&type=track')
      .then(function(json){
        this.setState({songResults: json.tracks.items})
      }.bind(this));
  }
});