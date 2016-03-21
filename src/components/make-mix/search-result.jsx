var React = require('react');
var SongPreview = require('./song-preview');


module.exports = React.createClass({
  getInitialState: function() {
    return {
      artists: ''
    }
  },
  componentWillMount: function() {
    this.artistNames();
  },
  render: function() {
    return <div className="search-result">
      {this.props.name} by {this.state.artists}
      <SongPreview songUrl={this.props.preview_url} imgUrl= {this.props.album.images[1].url}/>
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
  }
});