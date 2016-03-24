var React = require('react');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';
// var Sortable = require('react-sortable-items');
// var SortableMixin = require('react-sortable-items/SortableItemMixin');

module.exports = React.createClass({
  // mixins: [SortableMixin],
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
    return <div key={this.props.id} className="list-item">
      {this.state.track_name} by {this.state.artistJoined}
      <span onClick={this.handleDelete} className="delete">DELETE</span>
    </div>
  },
  handleDelete:function() {
    this.fbsong.remove();
  }
});