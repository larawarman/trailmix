var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactFire = require('reactfire');

var CreateMixStore = require('../../stores/createMix-store');
var SongArea = require('./songs/song-area');
var MixListItem = require('./songs/mix-list-item');
var MixArt = require('./mix-art');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(CreateMixStore),
    ReactFire.ReactFireMixin
  ],
  componentWillMount: function() {
    this.fb_songsRef = mixesRef.child(this.props.mix_key + '/songs/');
    this.fb_songsRef.on('value', this.handleDataLoaded);
  },
  render: function(){
    return <div>
      <div className="row">
        <div className="col-md-12">
          <ul className="mix-area">
            {this.renderMixSongs()}
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <SongArea />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <MixArt />
        </div>
      </div>
    </div>
  },
  renderMixSongs: function() {
    var songs = [];
    var index = 1;
    for (var key in this.state.mixSongs)  {
      var song = this.state.mixSongs[key];
      song.key = key;
      songs.push(
        <MixListItem
          song={song}
          key={key}
          index={index}
          mix_key={this.fb_songsRef.key}
        />
      );
      index++;
    }
    return songs
  },
  handleDataLoaded: function(snapshot) {
    CreateMixStore.setState({mixSongs: snapshot.val()});
  }
});