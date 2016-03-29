var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../stores/location-store');

var FindMixMain = require('./find-mix/find-mix-main');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(LocationStore)
  ],
  componentWillMount: function() {
    LocationStore.getLocation();;
  },
  render: function() {
    return <div>
      {this.content()}
    </div>
  },
  content: function() {
    if(this.props.children) {
      return this.props.children
    } else {
      return <div>
        <FindMixMain />
      </div>
    }
  }
});