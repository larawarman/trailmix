var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');

var LocMixesStore = require('../../stores/viewTMLocation-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(LocMixesStore),
    ReactFire
  ],
  // getInitialState:function() {
  //   return {
  //     //location_key: ''      
  //   }
  // },
  componentWillMount: function() {
    LocMixesStore.setState({location_key: this.props.params.id });
    //this.setState({location_key: this.props.params.id});
    this.all_ref = new Firebase(fireUrl);
    this.all_ref.on('value', this.handleMixLocLoaded);
  },
  render: function() {
    return <div>
      <h1>THIS IS A LOCATION PAGE for {this.props.params.id}</h1>
    </div>
  },
  handleMixLocLoaded: function(data){
    console.log(data.val());
    this.loc_ref = this.all_ref.child('locations/' + this.state.location_key);
    this.loc_ref.on('value', this.loadLocationMixes);
    console.log(this.loc_ref.toString());
  },
  loadLocationMixes: function(location) {
    // this.mix_ref = this.all_ref.child('mixes');
    console.log(location.val());
  }
});