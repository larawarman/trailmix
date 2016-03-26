var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Geosuggest = require('react-geosuggest');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var fireUrl = 'https://trailmix0.firebaseio.com/';

var MixSongsStore = require('../../stores/make-mix/mixSongs-store');
var LocationDrop = require('./location-drop');
var LocationTitle = require('./location-title');
var Hashtags = require('./hashtag-add');
var MixViewCreate = require('./mix-view-create');


module.exports = React.createClass({
  mixins: [ 
    StateMixin.connect(MixSongsStore),
    ReactFire 
  ],
  componentWillMount: function() {
    this.fb_mixesRef = new Firebase(fireUrl + '/mixes');
    this.fb_mixRef = this.fb_mixesRef.push();
    this.fb_mixRef.set({ 'published': false });
    //MixSongsStore.state.mix_path = this.fb_mixRef.toString();
    MixSongsStore.setState({mix_path: this.fb_mixRef.toString()});
  },
  getInitialState: function() {
    return {
      published: false
    }
  },
  render: function() {
    // console.log(this.state.mix_path);
    return <div className="row make-mix">
      <div className="col-md-12">
        <h1 className="text-center">
          Make Ur Mix
        </h1>
        <hr />
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <LocationTitle mix_url={this.fb_mixRef.toString()} />
          <LocationDrop mix_url={this.fb_mixRef.toString()} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>#'s</h4>
          <Hashtags mix_url={this.fb_mixRef.toString()} />
        </div>
      </div>
      <MixViewCreate mix_url={this.fb_mixRef.toString()} />
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
    this.fb_mixRef.update({ published: true });
  }
});