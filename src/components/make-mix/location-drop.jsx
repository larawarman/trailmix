var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/make-mix/location-store');
var Actions = require('../../actions');
var Geosuggest = require('react-geosuggest');


module.exports = React.createClass({
  mixins:[Reflux.ListenerMixin],
  getInitialState: function (){
    return({
        localLat: LocationStore.state.localLat,
        localLng: LocationStore.state.localLng,
        open: false
    })
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
  componentWillMount: function() {
    LocationStore.getLocation();;
  },
  render: function() {
    var fixtures = [
      {label: 'Drop It Here', location: {lat: this.state.localLat, lng: this.state.localLng}, className: 'drop-here'}        
    ];
    return <div className="location-drop">
      <Geosuggest 
        placeholder="Drop It Here"
        fixtures={fixtures}
        onChange={this.onChange}
        location={new google.maps.LatLng(this.state.localLat,this.state.localLng)}
        radius= '2'
        onSuggestSelect={this.onSuggestSelect}
        autoActivateFirstSuggest = {true}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        className={this.state.open === true ? 'open' : ''}
      />
    </div>
  },
  onSuggestSelect: function(suggest) {
    //need an error if we have no location AND user selects drop it here
    if( this.state.localLat === null && this.state.localLng === null && suggest.placeId.includes('Drop It Here')) {
      console.log("Error getting location. Please select a specific place");
    } else {
      console.log('success!');
      console.log(suggest);
      this.setState({open: false})
    }
  },
  handleFocus: function(){
    this.setState({open: true})
  },
  handleBlur: function() {
    this.setState({open: false})
  }
});