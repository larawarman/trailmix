var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      songUrl: '',
      imgUrl: '',
      isplaying: false
    };
  },
  componentWillMount: function() {
  },
  render: function() {
    var text = this.state.isplaying ? 'pause' : 'play';
    return <div onClick={this.handleControlClick}  className={"song-preview " + (this.state.isplaying ? 'playing' : '')}>
      {this.renderArt()}
      <div className = "audio-buttons">
        {text}
      </div>
      {this.state.isplaying ? this.renderAudio() : null}
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
  handleControlClick: function() {
    this.setState({isplaying: !this.state.isplaying});      
  }
});