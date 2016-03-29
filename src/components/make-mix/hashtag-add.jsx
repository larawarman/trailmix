var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
//var fireUrl = 'https://trailmix0.firebaseio.com/';

var MixSongsStore = require('../../stores/mixSongs-store');

module.exports = React.createClass({
  mixins: [ 
    StateMixin.connect(MixSongsStore),
    ReactFire 
  ],
  getInitialState: function(){
    return {
      value: ''
    }
  },
  componentWillMount: function() {
    this.fbtags = new Firebase(this.props.mix_url);
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
    }, function() {
      this.renderHashtags();
    });
  },
  renderHashtags:function() {
    var tagArr = this.state.value.split(' ');
      MixSongsStore.setState({tags: tagArr});
    },
  handleBlur: function() {
    this.fbtags.update({
      tags: this.state.tags
    });
  }
});