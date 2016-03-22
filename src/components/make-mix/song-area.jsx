var React = require('react');
var Reflux = require('reflux');
var QueryTracksStore = require('../../stores/make-mix/queryTracks-store');
var Actions = require('../../actions');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var SearchResult = require('./search-result');
var MixList = require('./mix-list');

var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [
    ReactFire,
    Reflux.listenTo(QueryTracksStore, 'onChange')
  ],
  componentWillMount: function() {
    this.fbtags = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbtags, 'songs');
  },
  getInitialState: function(){
    return {
      songResults: [],
      query: '',
      // songs: {},
      loaded: false
    }
  },
  render: function() {
    return <div className='mix-area'>
      <div className = {"content " + (this.state.loaded ? 'loaded' : '')}>
        <MixList items={this.state.items} />
      </div>
      <input 
        type="text" 
        ref="searchInput" 
        value={this.state.query} 
        onChange={this.setQuery} 
        placeholder="Search artist, album, or track" /> 
      <div className='results-area'>
        {this.renderResults()}
      </div>
    </div>
  },
  setQuery: function(event) {
    this.setState({query: event.target.value}, function() {
      var query = this.state.query;
      Actions.queryTracks(query);
    });
  },
  onChange: function(event, songResults) {
    this.setState({
      songResults: songResults
    });
    //pause all audio players if search changes, if user tries to play multiple
    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
            }
        }
    }, true);
  },
  renderResults: function() {
    return this.state.songResults.slice(0,20).map(function(result){
      return <SearchResult key={result.id} {...result} />
    });
  }
  // handleDataLoaded: function() {
  //   this.setState({loaded: true});
  // }
});