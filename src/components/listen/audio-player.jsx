var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');
var AudioStore = require('../../stores/audioPlayer-store');

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  componentWillMount: function() {
    Actions.getSongPreviewUrl(this.state.queue_songs[0]);
  },
  componentWillUpdate: function() {
    console.log("componentWillUpdate");
    Actions.loadSong();
  },
  render: function() {
    return <div className="audio-player">
      <audio id="player-main" controls>
        <source id="mp3-src" src={this.state.now_playing} type="audio/mpeg" />
      </audio>
    </div>
  }
});
