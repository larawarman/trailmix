var React = require('react');
var StateMixin = require('reflux-state-mixin');

var ViewMixStore = require('../../stores/viewMix-store');


module.exports = React.createClass({
  mixins: [ 
    StateMixin.connect(ViewMixStore)
  ],
  render: function() {
    return  <div className={"mix-art-container " + (this.state.loaded ? 'loaded' : '')}>
      {this.renderAlbumArt()}
    </div>
  },
  renderAlbumArt: function() {
    var albums = [];
    for (var key in this.state.mixImgs)  {
      var imageUrl = this.state.mixImgs[key];
      imageUrl.key = key;
      albums.push(
        <li
        key={key}
        >
          <img src={imageUrl} />
        </li>
        )
    }
    var alength = albums.length;
    if (alength === 0) {
      return null
    } else {
      return <ul className={(alength === 1 ? 'one' : (alength === 2 ? 'two' : (alength === 3 ? 'three' : (alength > 3 ? 'more' : '')))) }>
        {albums}
      </ul>
    }
  }
});