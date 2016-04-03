var Reflux = require('reflux');

module.exports = Reflux.createActions([
  //CREATE MIX
  'getLocation',
  'setQuery',
  'queryTracks',
  'closeResults',
  'pauseAllAudio',
  'playOneAudio',

  //FIND MIXES
  'getAllMixes',

  //VIEW MIX
  'getMixData',
]);