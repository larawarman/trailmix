var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/make-mix/location-store');
var Actions = require('../../actions');

module.exports = React.createClass({
  mixins:[Reflux.ListenerMixin],
  getInitialState: function (){
    return({
        localLat: LocationStore.state.localLat,
        localLng: LocationStore.state.localLng
    })
  },
  componentWillMount: function() {
    LocationStore.getLocation();
  },
  componentDidMount: function(){
   this.listenTo(
      LocationStore,
      (state)=>{
          this.setState({
              localLat:state.localLat,
              localLng:state.localLng
          })
      });
  },
  render: function () {
      if (this.state.localLat === null || this.state.localLng === null) {
        return <h4>
          loading latitude/longitude
        </h4>
      } else {
        return <h4>
          {this.state.localLat} / {this.state.localLng}
        </h4>
      }
  }
});