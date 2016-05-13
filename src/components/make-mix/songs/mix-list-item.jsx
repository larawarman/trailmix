var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../../actions');
var CreateMixStore = require('../../../stores/createMix-store');

module.exports = React.createClass({
  mixins:[
    StateMixin.connect(CreateMixStore),
    ReactFire
  ],
  componentWillMount: function() {
    this.fb_songRef = new Firebase(this.state.mix_path + '/songs/' + this.props.song.key);
    this.bindAsObject(this.fb_songRef, 'mixSongs');
  },
  render: function() {
    return <li 
      key={this.props.key} 
      className="list-item">
        {this.props.index}. {this.props.song.track_name} by {this.props.song.artistJoined}
        <span onClick={this.handleDelete} className="delete">DELETE</span>
    </li>
  },
  handleDelete:function() {
    this.fb_songRef.remove();
  }
});