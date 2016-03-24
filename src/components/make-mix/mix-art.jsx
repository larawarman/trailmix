var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

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
      mixSongs: {}
    }
  },
  render: function() {
    return  <div className={"mix-art-container " + (this.state.loaded ? 'loaded' : '')}>
      <h4>Mix Album Art</h4>
      {this.renderAlbumArt()}
    </div>
  },
  renderAlbumArt: function() {
    var children = [];
    for (var key in this.state.mixSongs)  {
      var song = this.state.mixSongs[key];
      song.key = key;
      children.push(
        <li
        song={song}
        key={key}
        >
          <img src={song.images[1].url} />
        </li>
        )
    }
    if (children.length === 0){
      return null
    } else if (children.length === 1) {
      return <ul className = 'one'>
        {children}
      </ul>
    } else if (children.length === 2) {
      return <ul className = 'two'>
        {children}
      </ul>
    } else if (children.length === 3) {
      return <ul className = 'three'>
        {children}
      </ul>
    } else if (children.length > 3) {
      return <ul className = 'more'>
        {children}
      </ul>
    }
  },
  handleDataLoaded: function(snapshot) {
    this.setState({loaded: true});
  }
});