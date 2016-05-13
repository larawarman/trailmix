var React = require('react');

var TimeAgo = require('react-timeago');

var Router = require('react-router');
var Link = Router.Link;

var ViewMixArt = require('./view-mix-art');

module.exports = React.createClass({
  render: function() {
    return <li key={this.props.id} className="mix-list-item">
      <ViewMixArt mixid={this.props.id} size={1} />
      <div className="mix-info-container">
        {this.renderArtists()}
        <div className="publish-date">
          <TimeAgo date={this.props.date} />
        </div>
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
      tag = '#' + tag;
      tags.push(
        <li key={'tags'+ key}>{tag}</li>
      );
    }
    return  <ul className="mix-tags">
      {tags}
    </ul>
  }
});