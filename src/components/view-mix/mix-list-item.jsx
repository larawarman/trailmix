var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    return <li key={this.props.id} className="mix-list-item">
      <div className="mix-art-container">
        {this.renderMixArt()}
      </div>
      <div className="mix-info-container">
        {this.renderArtists()}
        {this.renderTags()}
        <Link to={'/mix/' + this.props.id} id={this.props.id}>
          view mix
        </Link>
      </div>
    </li>
  },
  renderArtists: function() {
    var artists = [];
    for(var key in this.props.artists) {
      artist = this.props.artists[key];
      artists.push(
        <li key={'artists' + key}>{artist}</li>
      );
    }
    return <ul className="mix-artists">
      {artists}
    </ul>
  },
  renderTags: function() {
    var tags = [];
    for(var key in this.props.tags) {
      tag = this.props.tags[key];
      tags.push(
        <li key={'tags'+ key}>{'#' + tag}</li>
      );
    }
    return  <ul className="mix-tags">
      {tags}
    </ul>
  },
  renderMixArt: function() {
    var albums = [];
    for (var key in this.props.images)  {
      var imageUrl = this.props.images[key];
      imageUrl.key = key;
      albums.push(
        <li
        key={key}
        >
          <img src={imageUrl} />
        </li>
        )
    }
    var alength = albums.length;
    if (alength === 0) {
      return null
    } else {
      return <ul className={(alength === 1 ? 'one' : (alength === 2 ? 'two' : (alength === 3 ? 'three' : (alength > 3 ? 'more' : '')))) }>
        {albums}
      </ul>
    }
  }
});