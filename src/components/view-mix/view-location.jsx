var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var Actions = require('../../actions');

var LocMixesStore = require('../../stores/viewTMLocation-store');

var MixListItem = require('./mix-list-item');

module.exports = React.createClass({
  mixins: [
    StateMixin.connect(LocMixesStore)
  ],
  componentWillMount: function() {
    LocMixesStore.setState({location_key: this.props.params.id });
    Actions.getDB();
  },
  render: function() {
    return <div>
      <h1>THIS IS A LOCATION PAGE for {this.state.place_name}</h1>
      <ul>
        {this.renderMixList()}
      </ul>
    </div>
  },
  renderMixList: function(){
    mix_list_render = [];
    for (var key in this.state.mix_list) {
      mix = this.state.mix_list[key];
      mix_list_render.push(
        <MixListItem id={mix.id} artists={mix.artists} tags={mix.tags}>
        </MixListItem>
      );
    }
    return mix_list_render;
  }
});