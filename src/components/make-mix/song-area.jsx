var React = require('react');
var Reflux = require('reflux');
var QueryTracksStore = require('../../stores/make-mix/queryTracks-store');
var Actions = require('../../actions');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var fireUrl = 'https://trailmix0.firebaseio.com/';

var SearchResult = require('./search-result');
var MixList = require('./mix-list');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(QueryTracksStore, 'onChange'),
    ReactFire
  ],
  componentWillMount: function() {
    this.fbsonglist = new Firebase(fireUrl + '/mixes/mix/songs');
    this.bindAsObject(this.fbsonglist, 'mixSongs');
    this.fbsonglist.on('value', this.handleDataLoaded);
  },
  getInitialState: function(){
    return {
      songResults: [],
      query: '',
      queryResults: false,
      loaded: false,
      mixSongs: {}
    }
  },
  render: function() {
    document.addEventListener('play', function(e){
        var audios = document.getElementsByTagName('audio');
        for(var i = 0, len = audios.length; i < len;i++){
            if(audios[i] != e.target){
                audios[i].pause();
            }
        }
    }, true);
    return <div className='song-area'>
      <h4>Add a track</h4>
      <div className="input-area">
        <input 
          type="text" 
          ref="searchInput" 
          value={this.state.query} 
          onChange={this.setQuery} 
          placeholder="Search artist, album, or track" 
          id="search-query-input" 
          onFocus={this.clearInput}/> 
        <div onClick={this.clearInput} className="clear-input">[ x ]</div>
      </div>
      <div className={'results-area ' + (this.state.queryResults ? '' : 'hide-results')}id="query-results">
        {this.renderSearchResults()}
      </div>
    </div>
  },
  setQuery: function(event) {
    this.setState({query: event.target.value, queryResults:true}, function() {
      var query = this.state.query;
      Actions.queryTracks(query);       
    });
  },
  clearInput: function() {
    this.setState({
      query: '',
      queryResults: false
    });
    //pause if the input is cleared while still previewing
    var audios = document.getElementsByTagName('audio');
      for(var i = 0, len = audios.length; i < len;i++){
        audios[i].pause();
      }
  },
  onChange: function(event, songResults) {
    this.setState({
      songResults: songResults
    });
    //pause all audio players if search changes, if user tries to play multiple
  },
  renderSearchResults: function() {
    return this.state.songResults.slice(0,20).map(function(result){
      return <SearchResult key={result.id} {...result} />
    });
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  }
});