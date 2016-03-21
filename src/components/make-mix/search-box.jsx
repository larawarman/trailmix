var React = require('react');
var Reflux = require('reflux');
var QueryTracksStore = require('../../stores/make-mix/queryTracks-store');
var Actions = require('../../actions');

var SearchResult = require('./search-result');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(QueryTracksStore, 'onChange')
  ],
  getInitialState: function(){
    return {
      songResults: [],
      query: ''
    }
  },
  render: function() {
    return <div className='search-area'>
      <input 
        type="text" 
        ref="searchInput" 
        value={this.state.query} 
        onChange={this.setQuery} 
        placeholder="Search by artist" /> 
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
});