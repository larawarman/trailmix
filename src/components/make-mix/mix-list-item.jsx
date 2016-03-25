var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins:[
    ReactFire
  ],
  componentWillMount: function() {
    this.fbsong = new Firebase(fireUrl + '/mixes/mix/songs/' + this.props.song.key);
    this.bindAsObject(this.fbsong, 'mixSongs');
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
    console.log('delete');
    //this.fbsong.remove();
  }
});