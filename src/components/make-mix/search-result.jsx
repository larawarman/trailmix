var React = require('react');
var SongPreview = require('./song-preview');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.fbsongs = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsongs, 'songs');
    this.artistNames();
  },
  getInitialState: function() {
    return {
      track_name: '',
      artists_arr: [],
      artistJoined: '',
      images: [],
      external_ids: [],
      spotify_id: '',
      spotify_href: '',
      spotify_popularity: '',
      spotify_uri: ''
    }
  },
  render: function() {
    return <div className="search-result">
      <SongPreview songUrl={this.props.preview_url} imgUrl= {this.props.album.images[1].url}/>
      <div onClick={this.handleClick} className= "song-meta">
        <div className="track-name">
          {this.props.name}
        </div>
        <div className="artist-name">
          {this.state.artistJoined}
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
    this.setState({
      artistJoined: artists
    });
  },
  handleClick: function(){
    this.setState({
      track_name: this.props.name,
      artists_arr: this.props.artists,
      images: this.props.album.images,
      external_ids: this.props.external_ids,
      spotify_id: this.props.id,
      spotify_href: this.props.href,
      spotify_popularity: this.props.popularity,
      spotify_uri: this.props.uri
    }, function() {
      this.fbsongs.push({
        track_name: this.state.track_name,
        artists_arr: this.state.artists_arr,
        artistJoined: this.state.artistJoined,
        images: this.state.images,
        external_ids: this.state.external_ids,
        spotify_id: this.state.spotify_id,
        spotify_href: this.state.spotify_href,
        spotify_popularity: this.state.spotify_popularity,
        spotify_uri: this.state.spotify_uri
      });      
    });
  }
});