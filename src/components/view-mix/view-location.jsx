var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');

var ReactRouter = require('react-router');
// var Router = ReactRouter.Router;
// var browserHistory = ReactRouter.browserHistory;
var hashHistory = ReactRouter.hashHistory;

var Actions = require('../../actions');

var LocMixesStore = require('../../stores/viewTMLocation-store');

var MixListItem = require('./mix-list-item');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(LocMixesStore)
  ],
  componentWillMount: function() {
    LocMixesStore.setState({location_key: this.props.params.id });
    Actions.getMixLoc();
  },
  render: function() {
    if(this.state.mix_list.length > 1) {
      return <div className='content-wrap'>
        <div className="sub-container location-mixes col-md-6 col-md-offset-3">
          <div className='back-btn' onClick={this.goBack}>Back</div>
          <h1>{this.state.place_name}</h1>
          <h3>{this.state.num_mixes} mixes here</h3>
          <ul className="mix-list">
            {this.renderMixList()}
          </ul>
        </div>
      </div>
    } else if (this.state.mix_list.length === 1) {
      hashHistory.push('/');
      return <div>
      </div>
    } else {
      return <div>
      </div>
    }
    
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
  },
  goBack: function(){
    hashHistory.push('/');
  }
});