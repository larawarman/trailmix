var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var AudioStore = require('../../stores/audioPlayer-store');

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  render: function() {
    return <div className="audio-player">
      <audio controls>
        <source src="https://p.scdn.co/mp3-preview/76a36bc9557a89099434edad9d69b6106cfdd51b" type="audio/mpeg" />
      </audio>
    </div>
  },
});