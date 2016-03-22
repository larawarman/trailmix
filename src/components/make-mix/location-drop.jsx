var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/make-mix/location-store');
var Actions = require('../../actions');
var Geosuggest = require('react-geosuggest');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
  mixins:[
    Reflux.ListenerMixin,
    ReactFire
  ],
  componentWillMount: function() {
    this.fbloc = new Firebase(fireUrl + '/mixes/mix/location');
    this.bindAsObject(this.fbloc, 'location');
    LocationStore.getLocation();;
  },
  getInitialState: function (){
    return({
        localLat: LocationStore.state.localLat,
        localLng: LocationStore.state.localLng,
        open: false,
        lat: '',
        lng: '',
        gmaps_place_id: '',
        types: '',
        label: ''
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
      if (suggest.gmaps) {
        this.setState({
          lat: suggest.location.lat,
          lng: suggest.location.lng,
          label: suggest.label, 
          gmaps_place_id: suggest.gmaps.place_id,
          types: suggest.gmaps.types
        }, function() {
          this.fbloc.update({
            lat: this.state.lat,
            lng: this.state.lng,
            label: this.state.label,
            gmaps_place_id: this.state.gmaps_place_id,
            types: this.state.types
          });
        });
      } else {
        this.setState({
          lat: suggest.location.lat,
          lng: suggest.location.lng,
          label: suggest.label,
          gmaps_place_id: null,
          types: null
        }, function() {
          this.fbloc.update({
            lat: this.state.lat,
            lng: this.state.lng,
            label: this.state.label,
            gmaps_place_id: null,
            types: null
          });
        });
      }
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