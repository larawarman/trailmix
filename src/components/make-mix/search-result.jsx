var React = require('react');
var ReactFire = require('reactfire');
var StateMixin = require('reflux-state-mixin');
var Firebase = require('firebase');

var Actions = require('../../actions');
var CreateMixStore = require('../../stores/createMix-store');
var SongPreview = require('./song-preview');

//var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [ 
    StateMixin.connect(CreateMixStore),
    ReactFire 
  ],
  componentWillMount: function() {
    this.fbsonglist = new Firebase(this.state.mix_path + '/songs/');
    this.artistNames();
  },
  render: function() {
    return <div className="search-result">
      <SongPreview songUrl={this.props.preview_url} imgUrl= {this.props.album.images[1].url}/>
      <div onClick={this.handleClick} className= "song-meta">
        <div className="track-name">
          {this.props.name}
        </div>
        <div className="artist-name">
          {this.artistNames()}
        </div>
      </div>
    </div>
  },
  artistNames: function() {
    var artistArr = [];
    for (var key in this.props.artists)  {
      var item = this.props.artists[key];
      artistArr.push(item.name);
    }
    var artists = artistArr.join(' + ');
    return artists
  },
  handleClick: function(){
    this.fbsonglist.push({
      track_name: this.props.name,
      artists_arr: this.props.artists,
      artistJoined: this.artistNames(),
      images: this.props.album.images,
      external_ids: this.props.external_ids,
      spotify_preview_url: this.props.preview_url,
      spotify_id: this.props.id,
      spotify_href: this.props.href,
      spotify_popularity: this.props.popularity,
      spotify_uri: this.props.uri,
    }, function(){
      Actions.closeResults();
    });
  }
});