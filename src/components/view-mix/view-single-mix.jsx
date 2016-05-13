var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var TimeAgo = require('react-timeago');

var Actions = require('../../actions');

var ViewMixStore = require('../../stores/viewMix-store');
var AudioStore = require('../../stores/audioPlayer-store');

var ViewMixArt = require('./view-mix-art');
var MixSongList = require('./mix-song-list');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(ViewMixStore),
    StateMixin.connect(AudioStore)
  ],
  componentWillMount: function() {
    var id=this.props.params.id;
    Actions.getMixData(id);
  },
  render: function() {
    return <div className='content-wrap'>
      {this.state.the_mix ? this.renderContent() : null}
    </div>
  },
  renderContent: function() {
    return <div className="sub-container view-mix col-md-6 col-md-offset-3">
      <ViewMixArt mixid={this.props.params.id} size={1} />
      <div className="play-mix" onClick={this.addMixToPlay}>play</div>
      <ul className="hashtags">{this.renderHashtags()}</ul>
      {this.renderPlaceTime()}
      <MixSongList />
    </div>
  },
  renderHashtags: function() {
    var tags = [];
    for (var key in this.state.mix_tags) {
      var tag = this.state.mix_tags[key];
      tag = '#' + tag;
      tags.push(
        <li key={key}>{tag}</li>
      );
    }
    return tags
  },
  renderPlaceTime: function() {
    return <div>
      <h1>{this.state.mix_place} / <TimeAgo date={this.state.mix_time} /></h1>
    </div>
  },
  addMixToPlay: function() {
    var oldQueue = this.state.queue_song_ids;
    var mainQueue = [];
    for (var key in oldQueue) {
      var id = oldQueue[key];
      mainQueue.push(id)
    } 
    var finalQueue = this.createNewQueueArr(mainQueue);
    AudioStore.setState({
      queue_song_ids: finalQueue
    });
  },
  createNewQueueArr: function(mainQueue) {
    var newQueue = this.state.mix_spotify_ids;
    newQueue.reverse();
    for (var key in newQueue) {
      var id = this.state.mix_spotify_ids[key];
      mainQueue.unshift(id);
    }
    return mainQueue;
  }
});