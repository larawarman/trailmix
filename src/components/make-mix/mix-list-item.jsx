var React = require('react');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  componentWillMount: function() {
    this.fbsong = new Firebase(fireUrl + 'mixes/mix/songs/' + this.props.song.key);
  },
  getInitialState: function(){
    return {
      track_name: this.props.song.track_name,
      artistJoined: this.props.song.artistJoined,
      id: this.props.song.id
    }
  },
  render: function() {
    return <li key={this.props.id}>
      {this.state.track_name} by {this.state.artistJoined}
      <span onClick={this.handleDelete} className="delete">DELETE</span>
    </li>
  },
  handleDelete:function() {
    this.fbsong.remove();
  }
});