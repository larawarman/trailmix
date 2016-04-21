var Reflux = require('reflux');

module.exports = Reflux.createActions([
  //CREATE MIX STORE
  'getLocation',
  'getPlaceName',
  'setQuery',
  'queryTracks',
  'closeResults',
  'addSong',
  'pauseAllAudio',
  'playOneAudio',

  //VIEW MIX STORE
  'getAllMixesLocations',
  'setSingleMixes',
  'setMultiMixes',
  'getMixData',

  //VIEW TRAILMIX LOCATION STORE
  'getDB',
  'loadLocationDetails',
  'getMixListItems',

  //LISTEN TO STUFF
  'loadSong',
  'getSongsFromDB',
  'getNewSongQueue',
  // 'addSongToPlay'
]);