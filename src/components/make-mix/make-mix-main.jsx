var React = require('react');

var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var hashHistory = ReactRouter.hashHistory;
// var browserHistory = ReactRouter.browserHistory;

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var _ = require('lodash');
var GeoFire = require('geofire');

var fireUrl = 'https://trailmix0.firebaseio.com/';

var CreateMixStore = require('../../stores/createMix-store');
var CreateLocationStore = require('../../stores/createLocation-store');
var LocationDrop = require('./location-drop');
var Hashtags = require('./hashtag-add');
var SongsViewCreate = require('./songs-view-create');


module.exports = React.createClass({
  contextTypes : {
    router: React.PropTypes.object.isRequired
  },
  mixins: [ 
    StateMixin.connect(CreateLocationStore),
    StateMixin.connect(CreateMixStore),
    ReactFire.ReactFireMixin
  ],
  getInitialState: function() {
    return {
      published: false,
      songError: false,
      locationError: false
    }
  },
  componentWillMount: function() {
    this.fb_mixRef = mixesRef.push();
    this.fb_mixRef.set({ 'published': false });

    this.locationRef = locationsRef.push();
    this.locationRef.set({ 'verfied': false });
    this.locationKey = this.locationRef.key;

    this.geoFire = new GeoFire(geofireRef);
  },
  componentDidMount: function() {
    CreateMixStore.setState({mix_key: this.fb_mixRef.key});
  },
  // componentWillUnmount:function() {
  //   if(!this.state.published){
  //     this.fb_mixRef.remove();
  //   }
  // },
  render: function() {
    return <div className = 'content-wrap'>
      <div className='sub-container col-md-6 col-md-offset-3 make-mix'>
        <Link to="/" className="publish button" onClick={this.handleCancel}>
          Cancel
        </Link>
        <div className="title-area section">
          <h1 className="text-center">
            Drop A New Mix
          </h1>
        </div>
        <div className="location-area section">
          <div className={"locationerr error-state " + (this.state.locationError ? 'show-error' : '')}>You must select a location for your mix.</div>
          <h4>{this.state.localLat} / {this.state.localLng}</h4>
          <LocationDrop loc_url={this.locationRef.toString()} loc_key={this.locationRef.key} mix_url={this.fb_mixRef.toString()} mix_key={this.fb_mixRef.key} />
        </div>
        <div className="hashtag-area section">
          <h4>#'s</h4>
          <Hashtags mix_key={this.fb_mixRef.key} />
        </div>
        <div className="song-area section">
          <div className={"songerr error-state " + (this.state.songError ? 'show-error' : '')}>Your mix needs at least 1 song to be published.</div>
          <SongsViewCreate mix_key={this.fb_mixRef.key} />
        </div>
        <div className="publish-button section" onClick={this.handlePublish}>
          Publish
        </div>        
      </div>
    </div>
    // return <div className='content-wrap'>
    //   <div className="sub-container col-md-6 col-md-offset-3 make-mix">
    //     <Link to="/" className="publish button" onClick={this.handleCancel}>
    //       Cancel
    //     </Link>
    //     <div className="title-area section">
    //       <h1 className="text-center">
    //         Drop A New Mix
    //       </h1>
    //     </div>
    //     <div className="location-area section">
    //       <div className={"locationerr error-state " + (this.state.locationError ? 'show-error' : '')}>You must select a location for your mix.</div>
    //       <h4>{this.state.localLat} / {this.state.localLng}</h4>
    //       <LocationDrop loc_url={this.locationRef.toString()} loc_key={this.locationRef.key} mix_url={this.fb_mixRef.toString()} mix_key={this.fb_mixRef.key} />
    //     </div>
    //     <div className="hashtag-area section">
    //       <h4>#'s</h4>
    //       <Hashtags mix_key={this.fb_mixRef.key} />
    //     </div>
    //     <div className="song-area section">
    //       <div className={"songerr error-state " + (this.state.songError ? 'show-error' : '')}>Your mix needs at least 1 song to be published.</div>
    //       <SongsViewCreate mix_key={this.fb_mixRef.key} />
    //     </div>
    //     <div className="publish-button section" onClick={this.handlePublish}>
    //       Publish
    //     </div>
    //   </div>
    // </div>
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
          publish_date: Date.now()
        });
        hashHistory.push('/');
      }
      else {
        this.setState({locationError: true});
      }
    } else {
      this.setState({songError: true});
    }
  },
  handleCancel:function() {
    this.geoFire.remove(this.locationRef.key);
    this.fb_mixRef.remove();
    this.locationRef.remove();
  }
});