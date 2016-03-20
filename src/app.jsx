var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Geosuggest = require('react-geosuggest');

var LocationDrop = require('./components/make-mix/location-drop');
var LocationTitle = require('./components/make-mix/location-title');
var Hashtags = require('./components/make-mix/hashtag-add');

var fireUrl = 'https://trailmix0.firebaseio.com/';

var App = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    //this.fb = new Firebase(fireUrl + 'mixes/');
    //this.bindAsObject(this.fb, 'mixes');
    //this.fb.on('value', this.handleDataLoaded);
  },
  getInitialState: function(){
    return {
      loaded: false
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
    </div>
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
