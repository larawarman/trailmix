var React = require('react');
var StateMixin = require('reflux-state-mixin');

var ViewMixStore = require('../../stores/viewMix-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(ViewMixStore),
    ReactFire
  ],
  componentWillMount:function() {
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + this.props.id);
    this.fb_mixRef.on('value', this.handleMixLoaded);
  },
  render:function() {
    return <div className="mix-art-container" >
      {this.renderAlbumArt()}
    </div> 
  },
  handleMixLoaded: function(mix) {
    ViewMixStore.setState({songs_for_art: mix.val().songs})
  },
  renderAlbumArt:function() {
    if (this.state.songs_for_art) {
      var size = this.props.size;
      var albums = [];
      for (var key in this.state.songs_for_art)  {
        var imageUrl = this.state.songs_for_art[key].images[size].url;
        // console.log(imageUrl);
        albums.push(
          <li
          key={imageUrl}
          >
            <img src={imageUrl} />
          </li>
        );
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
  }
});