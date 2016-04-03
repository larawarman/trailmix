var React = require('react');
var StateMixin = require('reflux-state-mixin');

var CreateMixStore = require('../../stores/createMix-store');


module.exports = React.createClass({
  mixins: [ 
    StateMixin.connect(CreateMixStore)
  ],
  render: function() {
    return  <div className={"mix-art-container " + (this.state.loaded ? 'loaded' : '')}>
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
  }
});