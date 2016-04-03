var React = require('react');
var StateMixin = require('reflux-state-mixin');

// var ViewMixStore = require('../../stores/viewMix-store');


module.exports = React.createClass({

  render: function() {
    return <li>
      <img src={this.props.song.images[2].url} />
      {this.props.song.track_name} by {this.props.song.artistJoined}
    </li>
  }
});