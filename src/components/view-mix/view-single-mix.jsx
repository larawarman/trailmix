var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');

var ViewMixStore = require('../../stores/viewMix-store');

var ViewMixArt = require('./view-mix-art');
var MixSongList = require('./mix-song-list');

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(ViewMixStore)
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
      <h1>{this.state.mix_place}</h1>
    </div>
  }
});