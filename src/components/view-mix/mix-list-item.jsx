var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
  render: function() {
    console.log(this.props.id);
    return <li key={this.props.id}>
      <ul>
        {this.renderArtists()}
      </ul>
      <ul>
        {this.renderTags()}
      </ul>
      <Link to={'/mix/' + this.props.id} id={this.props.id}>
        view mix
      </Link>
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
    return artists;
  },
  renderTags: function() {
    var tags = [];
    for(var key in this.props.tags) {
      tag = this.props.tags[key];
      tags.push(
        <li key={'tags'+ key}>{tag}</li>
      );
    }
    return tags;
  }
});