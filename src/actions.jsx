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
  'sortLocalMixes',
  'getAllMixesLocations',
  'setSingleMixes',
  'setMultiMixes',
  'getMixData',

  //VIEW TRAILMIX LOCATION STORE
  'getDB',
  'loadLocationDetails',
  'getMixListItems',

  //LISTEN TO STUFF
  'getSongPlayInfo',
  'loadSong',
  'handleControlsPlay',
  'handleControlsPause',
  'handleControlsNext',
  'handleControlsPrev',
  'getSongsFromDB',
  'getNewSongQueue',
]);