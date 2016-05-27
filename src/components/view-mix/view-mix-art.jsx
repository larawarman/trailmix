var React = require('react');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
// var fireUrl = 'https://trailmix0.firebaseio.com/';



module.exports = React.createClass({
  mixins: [ 
    ReactFire
  ],
  getInitialState: function() {
    return {
      mix_images : [],
    }
  },
  componentWillMount: function() {
    var id=this.props.mixid;
    this.fb_mixRef = mixesRef.child(id);
    this.fb_mixRef.on('value', this.handleMixDataLoaded);
  },
  render: function() {
    return  <div className={"mix-art-container " + (this.state.loaded ? 'loaded' : '')}>
      {this.renderAlbumArt()}
    </div>
  },
  handleMixDataLoaded: function(mixdata) {
    mixdata = mixdata.val();
    var images = [];
    for (var key in mixdata.songs){
      var song = mixdata.songs[key];
      imageUrl = song.images[0].url;
      images.push(imageUrl);
    }
    this.setState({mix_images: images});
  },
  renderAlbumArt: function() {
    var mixImgs = this.state.mix_images;
    var albums = [];
    for (var key in mixImgs)  {
      var imageUrl = mixImgs[key];
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