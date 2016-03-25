var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var Actions = require('../../actions');
var ReactFire = require('reactfire');
var Firebase = require('firebase');

var MixSongsStore = require('../../stores/make-mix/mixSongs-store');
var SearchResult = require('./search-result');

var fireUrl = 'https://trailmix0.firebaseio.com/';

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(MixSongsStore),
    ReactFire
  ],
  getInitialState: function(){
    return {
      query: '' //let's keep the query in here since it is only used in this component
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
      <div className={'results-area ' + (this.state.queryResults ? '' : '')}id="query-results">
        {this.renderSearchResults()}
      </div>
    </div>
  },
  setQuery: function(event) {
    this.setState({query: event.target.value, queryResults:true}, function() {
      Actions.queryTracks(this.state.query);      
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
  renderSearchResults: function() {
    return this.state.songResults.slice(0,20).map(function(result){
      return <SearchResult key={result.id} {...result} />
    });
  }
});