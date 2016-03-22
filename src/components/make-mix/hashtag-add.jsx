var React = require('react');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
  mixins: [ ReactFire ],
  getInitialState: function(){
    return {
      value: '',
      tags: []
    }
  },
  componentWillMount: function() {
    this.fbtags = new Firebase(fireUrl + '/mixes/mix/');
    this.bindAsObject(this.fbtags, 'tags');
  },
  render: function() {
    return <input
      type="text"
      value={this.state.value}
      onChange={this.handleTextChange}
      placeholder="Separate tags with spaces"
      onBlur={this.handleBlur}
    />
  },
  handleTextChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },
  renderHashtags:function() {

  },
  handleBlur: function() {
    var tagArr = this.state.value.split(' ');
    this.setState({
      tags: tagArr
    }, function() {
      this.fbtags.update({
        tags: this.state.tags
      });
    });
  }
});