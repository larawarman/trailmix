var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      value: '',
      tags: []
    }
  },
  render: function() {
    return <input
      type="text"
      value={this.state.value}
      onChange={this.handleTextChange}
      placeholder="Separate tags with spaces"
    />
  },
  handleTextChange: function(event) {
    this.setState({
      value: event.target.value
    });
    this.hashtagify();
  },
  hashtagify: function(event) {
    tags = this.state.value.split(" ");
  }
});