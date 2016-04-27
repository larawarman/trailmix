var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');
var AudioStore = require('../../stores/audioPlayer-store');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var AudioQueue = require('./audio-queue');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(AudioStore)
  ],
  componentDidMount:function() {
    // this.secondInterval();
  },
  render: function() {
    var queue = this.state.queue_song_ids;
    if (queue.length > 0) {
      return <div className="main-audio-player" id="main-player-container">
        <AudioQueue />
        <p>{this.state.now_playing_track} by {this.state.now_playing_artist}</p>
        <div className='audio-controls'>
          <div className="play-btn" onClick={Actions.handleControlsPlay}>play</div>
          <div className="pause-btn" onClick={Actions.handleControlsPause}>pause</div>
          <div className="next-btn" onClick={Actions.handleControlsNext}>next</div>
          <div className="prev-btn" onClick={Actions.handleControlsPrev}>prev</div>
        </div>
        <audio id="player-main">
          <source id="mp3-src" src={this.state.now_playing_url} type="audio/mpeg" />
        </audio>
      </div>
    } else {
      return null
    }
  },
  secondInterval: function() {
    var interval = setInterval(this.getPlayhead, 1000);
  },
  getPlayhead:function() {
    // var newInterval = this.state.poll_interval + 1;
    var audio = document.getElementById('player-main');
    console.log('duration: ' + audio.duration);
    console.log('currentTime: ' + audio.currentTime);
    // AudioStore.setState({poll_interval: newInterval})
    // console.log(newInterval);
  }
});
