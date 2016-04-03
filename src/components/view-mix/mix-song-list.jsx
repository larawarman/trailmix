var React = require('react');

module.exports = React.createClass({
  
  render: function() {
    return <ul>
      {this.renderMixSong()}
    </ul>
  }
});