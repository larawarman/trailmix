var React = require('react');
var SongPreview = require('./song-preview');
var Actions = require('../../actions');
//var Reflux = require('reflux');


module.exports = React.createClass({
  // mixins: [Reflux.connect()],
  getInitialState: function() {
    return {
      artists: ''
      //spotify_id: '',
      //track_name: '',
      // artists_arr: [],
      // images: [],
      // external_ids: [],
      // spotify_href: '',
      // spotify_popularity: '',
      // spotify_uri: ''
    }
  },
  componentWillMount: function() {
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
          {this.state.artists}
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
      artists: artists
    });     
  },
  handleClick: function(){
    console.log(this.props.name);
    this.props.songsStore.push({
      track_name: this.props.name
    });
  }
});