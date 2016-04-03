var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');

MixSongsStore = require('../../stores/mixSongs-store');

var MixArt = require('../make-mix/mix-art');

module.exports = React.createClass({
  mixins: [
    // ReactFire,
    StateMixin.connect(MixSongsStore)
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
    return <div>
      <MixArt />
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <ul>{this.renderHashtags()}</ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          {this.renderPlaceTime()}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
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