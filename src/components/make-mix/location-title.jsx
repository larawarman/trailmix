var React = require('react');
var Reflux = require('reflux');

var StateMixin = require('reflux-state-mixin');
var CreateLocationStore = require('../../stores/createLocation-store');

var Actions = require('../../actions');


module.exports = React.createClass({
  mixins: [
    StateMixin.connect(CreateLocationStore)
  ],
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