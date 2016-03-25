var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
// var ReactDND = require('react-dnd');
// var HTML5Backend = require('react-dnd-html5-backend');
///touch might be necessary https://github.com/yahoo/react-dnd-touch-backend

var MixListItem = require('./mix-list-item');

var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
    //this.fbsonglist.on('child_changed', this.handleSongsAdded);
  },
  getInitialState: function() {
    return {
      loaded: false,
      mixSongs: {}
    }
  },
  render: function() {
    return  <div className={"mix-area " + (this.state.loaded ? 'loaded' : '')}>
      <h4>Mix Songs</h4>
      <ul>
        {this.renderMixSongs()}
      </ul>
    </div>
  },
  renderMixSongs: function() {
    var songs = [];
    var index = 1;
    for (var key in this.state.mixSongs)  {
      var song = this.state.mixSongs[key];
      song.key = key;
      songs.push(
        <MixListItem
          song={song}
          key={key}
          index={index}
        />
      );
      index++;
    }
    return <div className="mix-area">
      {songs}
    </div>
  },
  handleDataLoaded: function(snapshot) {
    this.setState({loaded: true,});
    console.log('loaded');
  }
});