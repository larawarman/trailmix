var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Sortable = require('react-sortable-items');
var SortableItemMixin = require('react-sortable-items/SortableItemMixin');

var MixListItem = require('./mix-list-item');

var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [ ReactFire, SortableItemMixin ],
  sortableOptions: {
    ref: "songlist",
    model: "songs"
  },
  componentWillMount: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
    this.fbsonglist.on('child_changed', this.handleDataChange);
  },
  getInitialState: function() {
    return {
      loaded: false,
      mixSongs: {},
      songs: []
    }
  },
  render: function() {
    return  <div className={"mix-area " + (this.state.loaded ? 'loaded' : '')}>
      <h4>Mix Songs</h4>
      {this.renderMixSongs()}
    </div>
  },
  renderMixSongs: function() {
    if(this.state.loaded){
      for (var key in this.state.mixSongs) {
        var song = this.state.mixSongs[key];
        song.key = key;
        this.state.songs.push(
          song
        );
      }      
      var songs = this.state.songs.map(function (song, idx) {
        return <MixListItem 
          key={song.key} 
          artist={song.artistJoined}
          title={song.track_name}
          id={song.key}
          index={idx} 
          sortData={idx} 
          isDraggable={true} />;
      });
      return <div className="mix-area">
        <Sortable onSort={this.handleSort}>
          {songs}
        </Sortable>
      </div>
    }
  },
  handleDataLoaded: function(snapshot) {
    this.setState({loaded: true,});
    console.log('data loaded');
  },
  handleSort: function(reorder) {

  },
  handleDataChange:function(){
    console.log('data changed');
  }
});