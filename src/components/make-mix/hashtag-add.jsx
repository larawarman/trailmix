var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');

var CreateMixStore = require('../../stores/createMix-store');

module.exports = React.createClass({
  mixins: [ 
    StateMixin.connect(CreateMixStore),
    ReactFire.ReactFireMixin 
  ],
  getInitialState: function(){
    return {
      value: ''
    }
  },
  componentWillMount: function() {
    this.fbtags = mixesRef.child(this.props.mix_key);
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
    }, function() {
      this.renderHashtags();
    });
  },
  renderHashtags:function() {
    var tagArr = this.state.value.split(' ');
    var cleanTagArr = [];
    for (var i in tagArr) {
      var tag = tagArr[i];
      tag = tag.replace('#', '');
      cleanTagArr.push(tag);
    }
    CreateMixStore.setState({tags: cleanTagArr});
  },
  handleBlur: function() {
    this.fbtags.update({
      tags: this.state.tags
    });
  }
});