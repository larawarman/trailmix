var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var update = require('react-addons-update');

var MixListItem = require('./mix-list-item');

var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
    //this.fbsonglist.on('child_added', this.handleSongsAdded);
  },
  getInitialState: function() {
    return {
      loaded: false,
      mixSongs: {},
      list: []
    }
  },
  render: function() {
    //console.log(this.state.mixSongs);
    return  <div className={"mix-area " + (this.state.loaded ? 'loaded' : '')}>
      <h4>Mix Songs</h4>
      {this.renderMixSongs()}
    </div>
  },
  renderMixSongs: function() {
    var songs = [];
    for (var key in this.state.mixSongs)  {
      var song = this.state.mixSongs[key];
      song.key = key;
      songs.push(
        <MixListItem
          song={song}
          key={key}
        />
      );
    }
    return <div className="mix-area">
      {songs}
    </div>
  },
  handleDataLoaded: function(snapshot) {
    this.setState({loaded: true,});
  }
});