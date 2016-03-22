var React = require('react');

var MixListItem = require('./mix-list-item');

module.exports = React.createClass({

  render: function() {
    return <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <ul>
          {this.renderList()}
        </ul>
      </div>
    </div>
  },
  renderList: function() {
    if(!this.props.songs) {
      return null
    } else {
      var songs = [];
      for (var key in this.props.songs)  {
        var song = this.props.songs[key];
        song.key = key;
        
        songs.push(
          <MixListItem
            song={song}
            key={key}
          />
        )
      }
      return songs;
    }
  }
});