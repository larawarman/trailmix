var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


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
        <h1>welcome to trailmix</h1>
        <Link to="/make-mix/new" className="navbar-brand">
          make ur mix
        </Link>
      </div>
    }
  }
});