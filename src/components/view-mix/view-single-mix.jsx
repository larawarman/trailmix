var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

PublishedMixStore = require('../../stores/publishedMix-store');

var MixArt = require('../make-mix/mix-art');

module.exports = React.createClass({
  mixins: [
    ReactFire,
    StateMixin.connect(PublishedMixStore)
  ],
  componentWillMount: function() {
    this.fb_mixRef = new Firebase(fireUrl + '/mixes/' + this.props.params.id);
    this.bindAsObject(this.fb_mixRef, 'the_mix');
    this.fb_mixRef.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div>
      {this.state.the_mix ? this.renderContent() : null}
    </div>
  },
  renderContent: function() {
    return <div>
      <ul>{this.renderHashtags()}</ul>
      {this.renderPlaceTime()}
    </div>
  },
  // renderArt: function() {
  //   var images = [];
  //   for (var key in this.state.mix_songs) {
  //     var song = this.state.mix_tags[key];

  //   }
  // },
  renderHashtags: function() {
    var tags = [];
    for (var key in this.state.mix_tags) {
      var tag = this.state.mix_tags[key];
      tags.push(
        <li key={key}>{tag}</li>
      );
    }
    return tags
  },
  renderPlaceTime: function() {
    return <div>
      <h1>{this.state.mix_place}</h1>
    </div>
  },
  handleDataLoaded: function(snapshot) {
    console.log(snapshot.val());
    var mix = snapshot.val();
    PublishedMixStore.setState({
      the_mix: mix,
      mix_place: mix.location.label,
      mix_tags: mix.tags,
      mix_songs: mix.songs
    });
  }
});