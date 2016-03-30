var React = require('react');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [
    ReactFire
  ],
  getInitialState: function() {
    return {
      the_mix: {}
    }
  },
  componentWillMount: function() {
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + this.props.key);
    this.bindAsObject(this.fb_mixRef, 'the_mix');
    this.fb_mixRef.on('value', this.handleDataLoaded);
    console.log(this.fb_mixRef.toString());
  },
  render: function() {
    return <div>

    </div>
  },
  handleDataLoaded: function(snapshot) {
    console.log(snapshot.val());
  }
});