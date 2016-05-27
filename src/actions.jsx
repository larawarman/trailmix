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
  'setSingleMixes',
  'setMultiMixes',
  'getMixData',

  //VIEW TRAILMIX LOCATION STORE
  'getMixLoc',
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