var React = require('react');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';
var Sortable = require('react-sortable-items');
var SortableItemMixin = require('react-sortable-items/SortableItemMixin');

module.exports = React.createClass({
  mixins: [SortableItemMixin],
  componentWillMount: function() {
    this.fbsong = new Firebase(fireUrl + 'mixes/mix/songs/' + this.props.key);
  },
  getInitialState: function(){
    return {
      track_name: this.props.title,
      key: this.props.key
      // artistJoined: this.props.song.artistJoined,
      //id: this.props.song.id
    }
  },
  render: function() {
    return this.renderWithSortable(<li key={this.props.key} className="list-item">
      {this.props.title}
      <span onClick={this.handleDelete} className="delete">DELETE</span>
    </li>);
  },
  handleDelete:function() {
    console.log('delete');
    this.fbsong.remove();
  },
  handleDataLoaded:function(){
    console.log("loaded");
  }
});