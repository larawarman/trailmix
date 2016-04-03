var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var Actions = require('../../actions');

var CreateMixStore = require('../../stores/createMix-store');
var SearchResult = require('./search-result');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(CreateMixStore)
  ],
  getInitialState: function(){
    return {
      query: '' //let's keep the query in here since it is only used in this component
    }
  },
  render: function() {
    Actions.playOneAudio();
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
          onFocus={this.handleFocus} /> 
        <div onClick={this.closeResultsPlus} className={"clear-input " + (this.state.showresults ? '' : 'hide-clear-btn')}>[ x ]</div>
      </div>
      <div className={'results-area ' + (this.state.showresults ? '' : 'hide-results')} id="query-results">
        {this.renderSearchResults()}
      </div>
    </div>
  },
  setQuery: function(event) {
    this.setState({query: event.target.value}, function() {
      Actions.queryTracks(this.state.query);      
    });
  },
  closeResultsPlus: function() {
    this.setState({query:''});
    Actions.closeResults();
  },
  handleFocus: function() {
    CreateMixStore.setState({mix_path: this.props.mix_url})
    this.setState({
      query: ''
    });
    //pause if the input is cleared while still previewing
    Actions.pauseAllAudio();
  },
  renderSearchResults: function() {
    return this.state.songResults.slice(0,20).map(function(result, i){
      return <SearchResult key={result.id} {...result} />
    });
  }
});