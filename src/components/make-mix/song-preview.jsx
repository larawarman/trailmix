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
    //var text = this.state.songPlay ? 'pause' : 'play';
    return <div onClick={this.handleAudioControlClick}  className={"song-preview " + (this.state.songPlay ? 'nowplaying' : '')}>
      {this.renderArt()}
      <div className = "audio-buttons">
        <span className="playButton">play</span>
        <span className="pauseButton">pause</span>
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
    console.log('handleAudioControlClick');
    var elems = document.querySelectorAll(".song-preview.nowplaying");

    [].forEach.call(elems, function(el) {
      el.classList.remove("nowplaying");
    });   
    this.setState({songPlay: !this.state.songPlay});
  }
});