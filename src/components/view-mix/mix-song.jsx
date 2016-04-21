var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');

var AudioStore = require('../../stores/audioPlayer-store');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  render: function() {
    return <li>
      <img src={this.props.song.images[2].url} />
      <h4>{this.props.song.track_name}</h4>
      <p>by {this.props.song.artistJoined}</p>
      <div className = "song-play" onClick={Actions.addSongToPlay}>play song</div>
    </li>
  }
});