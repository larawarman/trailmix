var React = require('react');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
  componentWillMount: function() {
    this.fbsong = new Firebase(fireUrl + 'mixes/mix/songs/' + this.props.song.key);
  },
  render: function() {
    return <li 
      key={this.props.key} 
      className="list-item">
        {this.props.index}: {this.props.song.track_name} by {this.props.song.artistJoined}
        <span onClick={this.handleDelete} className="delete">DELETE</span>
    </li>
  },
  handleDelete:function() {
    this.fbsong.remove();
  }
});