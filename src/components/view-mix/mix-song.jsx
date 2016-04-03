var React = require('react');
var StateMixin = require('reflux-state-mixin');

// var ViewMixStore = require('../../stores/viewMix-store');


module.exports = React.createClass({

  render: function() {
    return <li>
      <img src={this.props.song.images[2].url} />
      <h4>{this.props.song.track_name}</h4>
      <p>by {this.props.song.artistJoined}</p>
    </li>
  }
});