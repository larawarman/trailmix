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
    //console.log(this.props.params.id);
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + this.props.params.id);
    this.bindAsObject(this.fb_mixRef, 'the_mix');
    this.fb_mixRef.on('value', this.handleDataLoaded);
    //console.log(this.fb_mixRef.toString());
  },
  render: function() {
    return <div>
      <h1>The Mix {this.props.params.id} Renders</h1>
    </div>
    // return <div>
    //   {this.state.the_mix ? this.renderContent() : null}
    // </div>
  },
  renderContent: function() {
  },
  handleDataLoaded: function(snapshot) {
    console.log(snapshot.val());
  }
});