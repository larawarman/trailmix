var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Geosuggest = require('react-geosuggest');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var fireUrl = 'https://trailmix0.firebaseio.com/';

var LocationDrop = require('./location-drop');
var LocationTitle = require('./location-title');
var Hashtags = require('./hashtag-add');
var MixViewCreate = require('./mix-view-create');


module.exports = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.fbmix = new Firebase(fireUrl + '/mixes/mix');
    this.fbmix.push();
    this.fbmix.set({ 'published': false });
  },
  getInitialState: function() {
    return {
      published: false
    }
  },
  render: function() {
    return <div className="row make-mix">
      <div className="col-md-12">
        <h1 className="text-center">
          Make Ur Mix
        </h1>
        <hr />
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <LocationTitle />
          <LocationDrop />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>#'s</h4>
          <Hashtags />
        </div>
      </div>
      <MixViewCreate />
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <Link to="/" className="publish button" onClick={this.handlePublish}>
            Publish
          </Link>
        </div>
      </div>
    </div>
  },
  handlePublish: function() {
    this.fbmix.update({ published: true });
  }
});

//var element = React.createElement(App, {});
//ReactDOM.render(element, document.querySelector('.container'));