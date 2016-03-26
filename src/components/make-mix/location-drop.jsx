var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/make-mix/location-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
// var fireUrl = 'https://trailmix0.firebaseio.com/';

var Actions = require('../../actions');
var Geosuggest = require('react-geosuggest');



module.exports = React.createClass({
  mixins:[
    StateMixin.connect(LocationStore),
    ReactFire
  ],
  componentWillMount: function() {
    this.fbloc = new Firebase(this.props.mix_url + '/location');
    this.bindAsObject(this.fbloc, 'location');
    this.fbloc.on('value', this.handleDataLoaded);
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
  },
  handleDataLoaded: function(snapshot) {
    //this.setState({displayLabel: snapshot.val().label});
  }
});