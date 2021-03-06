var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      songUrl: '',
      imgUrl: '',
      songPlay: false
    };
  },
  render: function() {
    return <div onClick={this.handleAudioControlClick}  className={"song-preview " + (this.state.songPlay ? 'nowplaying' : '')}>
      {this.renderArt()}
      <div className = "audio-buttons">
        <span className="playButton"><i className="icon ion-ios-play-outline"></i>play</span>
        <span className="pauseButton"><i className="icon ion-ios-pause-outline"></i>pause</span>
      </div>
      {this.state.songPlay ? this.renderAudio() : null}
    </div>
  },
  renderArt: function() {
    return <img src={this.props.imgUrl} />
  },
  renderAudio: function(){
    return <div>
      <audio preload autoPlay>
        <source src={this.props.songUrl} type="audio/mpeg" />
      </audio>
    </div>
  },
  handleAudioControlClick: function() {
    var elems = document.querySelectorAll(".song-preview.nowplaying");
    [].forEach.call(elems, function(el) {
      el.classList.remove("nowplaying");
    });   
    this.setState({songPlay: !this.state.songPlay});
  }
});