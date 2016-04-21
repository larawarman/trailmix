var React = require('react');

var Router = require('react-router');
var Link = Router.Link;
// var browserHistory = Router.browserHistory;


var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Geosuggest = require('react-geosuggest');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');

var fireUrl = 'https://trailmix0.firebaseio.com/';

var CreateMixStore = require('../../stores/createMix-store');
var CreateLocationStore = require('../../stores/createLocation-store');
var LocationDrop = require('./location-drop');
var LocationTitle = require('./location-title');
var Hashtags = require('./hashtag-add');
var MixViewCreate = require('./mix-view-create');


module.exports = React.createClass({
  contextTypes : {
    router: React.PropTypes.object.isRequired
  },
  mixins: [ 
    StateMixin.connect(CreateMixStore),
    ReactFire 
  ],
  getInitialState: function() {
    return {
      published: false,
      songError: false,
      locationError: false
    }
  },
  componentWillMount: function() {
    this.fb_mixesRef = new Firebase(fireUrl + '/mixes');
    this.fb_mixRef = this.fb_mixesRef.push();
    this.fb_mixRef.set({ 'published': false });
    CreateMixStore.setState({mix_path: this.fb_mixRef.toString()});
  },
  // componentWillUnmount:function() {
  //   if(!this.state.published){
  //     this.fb_mixRef.remove();
  //   }
  // },
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
          <div className={"locationerr error-state " + (this.state.locationError ? 'show-error' : '')}>You must select a location for your mix.</div>
          <LocationTitle mix_url={this.fb_mixRef.toString()} />
          <LocationDrop mix_url={this.fb_mixRef.toString()} mix_key={this.fb_mixRef.key()} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h4>#'s</h4>
          <Hashtags mix_url={this.fb_mixRef.toString()} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className={"songerr error-state " + (this.state.songError ? 'show-error' : '')}>Your mix needs at least 1 song to be published.</div>
          <MixViewCreate mix_url={this.fb_mixRef.toString()} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <div className="publish button" onClick={this.handlePublish}>
            Publish
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <Link to="/" className="publish button" onClick={this.handleCancel}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  },
  songsCheck: function() {
    if(_.isEmpty(this.state.mixSongs)) {
      return false;
    } else {
      return true;
    }
  },
  locationCheck: function() {
    if(_.isEmpty()) {
      console.log('no location');
    }
  }, 
  handlePublish: function() {
    if (this.songsCheck() === true) {
      if (CreateLocationStore.state.drop_name !== '') {
        this.fb_mixRef.update({ 
          published: true,
          publish_date: Firebase.ServerValue.TIMESTAMP
        });
        this.context.router.push('/');
      }
      else {
        console.log('no location');
        this.setState({locationError: true});
      }
    } else {
      this.setState({songError: true});
    }
  },
  handleCancel:function() {
    this.fb_mixRef.remove();
  }
});