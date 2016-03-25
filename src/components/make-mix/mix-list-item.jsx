var React = require('react');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';
var Sortable = require('react-sortable-items');
var SortableItemMixin = require('react-sortable-items/SortableItemMixin');

module.exports = React.createClass({
  mixins: [SortableItemMixin],
  componentWillMount: function() {
    this.fbsong = new Firebase(fireUrl + 'mixes/mix/songs/' + this.props.id);
  },
  getInitialState: function(){
    return {
      track_name: this.props.title,
      id: this.props.id
      // artistJoined: this.props.song.artistJoined,
      //id: this.props.song.id
    }
  },
  render: function() {
    return <li key={this.props.key} className="list-item">
      {this.props.title} by {this.props.artist}
      <div class="list-action-buttons">
        <span onClick={this.handleDelete} className="delete">DELETE</span>
      </div>
    </li>
    // return this.renderWithSortable(<li key={this.props.key} className="list-item">
    //   {this.props.title} by {this.props.artist}
    //   <div class="list-action-buttons">
    //     <span>REORDER</span>
    //     <span onClick={this.handleDelete} className="delete">DELETE</span>
    //   </div>
    // </li>);
  },
  handleDelete:function() {
    console.log('delete');
    this.fbsong.remove();
  }
});