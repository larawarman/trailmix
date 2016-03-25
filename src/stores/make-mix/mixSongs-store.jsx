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

      //firebase data for each song
      // track_name: '',
      // artistJoined: '',
      // artists_arr: [],
      // images: [],
      // external_ids: [],
      // spotify_preview_url: '',
      // spotify_id: '',
      // spotify_href: '',
      // spotify_popularity: '',
      // spotify_uri: '',
      // place_in_mix: 0
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.mixSongs !== prevState.mixSongs){
      console.log('updated: ' + this.state.mixSongs);
    }
  },
  queryTracks: function(query) {
    if (query === '') {
    } else {
      Api.get('q=' + query + '&type=track')
        .then(function(json){
          this.setState({songResults: json.tracks.items})
        }.bind(this));
    }
  },
  closeQuery: function() {
    console.log('close the drawer');
    document.getElementById("search-query-input").value = '';
  },
  pauseAllAudio: function() {
    var audios = document.getElementsByTagName('audio');
    for(var i = 0, len = audios.length; i < len;i++){
      audios[i].pause();
    }
  },
  playOneAudio: function() {
    //only play one audio at a time
    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
            }
        }
    }, true);
  }
});