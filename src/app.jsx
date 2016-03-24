var React = require('react');
var ReactDOM = require('react-dom');
var Geosuggest = require('react-geosuggest');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var fireUrl = 'https://trailmix0.firebaseio.com/';

var LocationDrop = require('./components/make-mix/location-drop');
var LocationTitle = require('./components/make-mix/location-title');
var Hashtags = require('./components/make-mix/hashtag-add');
var SongArea = require('./components/make-mix/song-area');
var MixList = require('./components/make-mix/mix-list');
var MixArt = require('./components/make-mix/mix-art');


var App = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    this.fbmix = new Firebase(fireUrl + '/mixes/mix/published');
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
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <MixList /> 
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <SongArea />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <MixArt />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <button className="publish button" onClick={this.handlePublish}>
            Publish
          </button>
        </div>
      </div>
    </div>
  },
  handlePublish: function() {
    this.setState({
      published: true
    }, function() {
      this.fbmix.set({ 
        published: this.state.published 
      });
    });
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
