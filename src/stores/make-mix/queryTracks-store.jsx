var Reflux = require('reflux');
var Actions = require('../../actions');
var Api = require('../../utils/api');

var SearchResultsStore = module.exports = Reflux.createStore({
  listenables: [Actions],
  queryTracks: function(query) {
    Api.get('q=' + query + '&type=track')
      .then(function(json){
        this.songResults = json.tracks.items;
        this.triggerChange();
      }.bind(this));
  },
  triggerChange: function() {
    this.trigger('change', this.songResults);
  }
});