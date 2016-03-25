var Reflux = require('reflux');
var Actions = require('../../actions');
var StateMixin = require('reflux-state-mixin');

var MixSongsStore = module.exports = Reflux.createStore({
  mixins: [StateMixin.store],
  listenables: [Actions],
  getInitialState: function(){
    return{
      mixSongs: {},
      loaded: false,
      //song metadata
      place_in_mix: 0,
      track_name: '',
      artistJoined: '',
      images: [],
      external_ids: [],
      spotify_preview_url: '',
      // artists_arr: [],
      //spotify_id: '',
      //spotify_href: '',
      //spotify_popularity: '',
      //spotify_uri: '',
    }
  },
  getSongsFromMix: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
  },
  artistNames: function() {
    var artistArr = [];
    for (var key in this.props.artists)  {
      var item = this.props.artists[key];
      artistArr.push(item.name);
    }
    var artists = artistArr.join(' + ');
    this.setState({
      artistJoined: artists
    });
  },
  handleDataLoaded: function() {
    this.setState({ loaded: true});
  }
});