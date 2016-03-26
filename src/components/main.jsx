var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var FindMixMain = require('./find-mix/find-mix-main');
var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
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