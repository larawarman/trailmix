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
  'getAllMixes',
  'getAllLocations',
  'setSingleMixes',
  // 'getSingleMixesByLocation',
  // 'setSingleMixFlag',
  //VIEW MIX
  'getMixData',
]);