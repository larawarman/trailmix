var Reflux = require('reflux');

module.exports = Reflux.createActions([
  //CREATE MIX
  'getLocation',
  'getPlaceName',
  'setQuery',
  'queryTracks',
  'closeResults',
  'pauseAllAudio',
  'playOneAudio',

  //FIND MIXES
  'getAllMixesLocations',
  'setSingleMixes',
  'setMultiMixes',
  //VIEW MIX
  'getMixData',
]);