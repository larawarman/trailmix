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
    return <div className="location-mixes col-md-6 col-md-offset-3">
      <h1>{this.state.place_name}</h1>
      <h3>{this.state.num_mixes} mixes here</h3>
      <ul className="mix-list">
        {this.renderMixList()}
      </ul>
    </div>
  },
  renderMixList: function(){
    mix_list_render = [];
    for (var key in this.state.mix_list) {
      mix = this.state.mix_list[key];
      mix_list_render.push(
        <MixListItem 
        key={mix.id} 
        id={mix.id} 
        artists={mix.artists} 
        tags={mix.tags} 
        images={mix.images} 
        date={mix.date} >
        </MixListItem>
      );
    }
    return mix_list_render;
  }
});