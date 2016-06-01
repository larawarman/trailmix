var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../actions');

var Api = require('../utils/api');

var ReactFire = require('reactfire');

var CreateMixStore = module.exports = Reflux.createStore({
  mixins: [
    StateMixin.store, 
    ReactFire
  ],
  listenables: [Actions],
  getInitialState: function(){
    return{
      //MIXES
      mixSongs: {},

      //MAKE MIX SEARCH
      songResults: [], //songs that are the result of a song query
      showresults: null, //flag to show whether or not to show search results

      //CREATE MIX
      tags: [], //hashtags as an array
      mix_key: '', //key to the mix,
      mix_path: '', //NEED TO GET RID OF THIS

      //CREATE SONG
      track_name: '',
      artists_arr: '',
      artistJoined: '',
      images: '',
      external_ids: '',
      spotify_preview_url: '',
      spotify_id: '',
      spotify_href: '',
      spotify_popularity: '',
      spotify_uri: '',
    }
  },
  storeDidUpdate: function(prevState) {
    if(this.state.spotify_id !== prevState.spotify_id){
      Actions.addSong();
    }
    if(this.state.mixSongs !== prevState.mixSongs){
    }
  },
  addSong: function(spotify_id) {
    songsRef.push({
      track_name: this.state.track_name,
      artists_arr: this.state.artists_arr,
      artistJoined: this.state.artistJoined,
      images: this.state.images,
      external_ids: this.state.external_ids,
      spotify_preview_url: this.state.spotify_preview_url,
      spotify_id: this.state.spotify_id,
      spotify_href: this.state.spotify_href,
      spotify_popularity: this.state.spotify_popularity,
      spotify_uri: this.state.spotify_uri,
    });
  },
  //SEARCH
  queryTracks: function(query) {
    if (query === '') {
      this.setState({showresults:false});
    } else {
      this.setState({showresults:true});
      Api.get('q=' + query + '&type=track')
        .then(function(json){
          this.setState({songResults: json.tracks.items})
        }.bind(this));
    }
  },
  closeResults: function() {
    Actions.pauseAllAudio();
    this.setState({showresults:false});
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