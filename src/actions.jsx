var Reflux = require('reflux');

module.exports = Reflux.createActions([
  //CREATE MIX STORE
  'getLocation',
  'getPlaceName',
  'setQuery',
  'queryTracks',
  'closeResults',
  'pauseAllAudio',
  'playOneAudio',

  //VIEW MIX STORE
  'getAllMixesLocations',
  'setSingleMixes',
  'setMultiMixes',
  'getMixData',
]);