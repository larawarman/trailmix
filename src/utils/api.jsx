var Fetch = require('whatwg-fetch');
var Keys = require('./keys');
var rootUrl = 'https://api.spotify.com/v1/search?';
// var apiKey = 'a1a87ac0dcb1276';
//q=quilt&type=artist
module.exports = window.api = {
  get: function(url) {
    return fetch(rootUrl + url)
    .then(function(response){
      return response.json()
    });
  }
};