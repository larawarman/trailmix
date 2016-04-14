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
    return <div>
      {this.state.the_mix ? this.renderContent() : null}
    </div>
  },
  renderContent: function() {
    return <div className="view-mix">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ViewMixArt />
          <div className="play-mix" onClick={this.addMixToPlay}>play</div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ul className="hashtags">{this.renderHashtags()}</ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          {this.renderPlaceTime()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
        <MixSongList />
        </div>
      </div>
    </div>
  },
  renderHashtags: function() {
    var tags = [];
    for (var key in this.state.mix_tags) {
      var tag = this.state.mix_tags[key];
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
    var mainQueue = this.state.queue_song_ids;
    var newQueue = this.state.mix_spotify_ids;
    newQueue.reverse();
    for (var key in newQueue) {
      id = this.state.mix_spotify_ids[key];
      mainQueue.unshift(id);
    }
    AudioStore.setState({queue_song_ids: mainQueue});
  }
});