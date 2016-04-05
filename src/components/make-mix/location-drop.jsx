var React = require('react');
var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var LocationStore = require('../../stores/location-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var Actions = require('../../actions');
var Geosuggest = require('react-geosuggest');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(LocationStore),
    ReactFire
  ],
  componentWillMount: function() {
    this.mixLocationRef = new Firebase(this.props.mix_url + '/location');
    this.locationsRef = new Firebase(fireUrl + '/locations');
    this.locationRef = this.locationsRef.push();
  },
  componentWillUnmount: function() {
    //UPDATE THE DB, PRESUMING MIX IS PUBLISHED? NEED TO MOVE THIS TO MAKE-MIX-MAIN PROB
    this.addLocation();
    this.mixLocationRef.set({
      drop_name: this.state.drop_name,
      drop_lat: this.state.drop_lat,
      drop_lng: this.state.drop_lng,
      drop_gmaps_id: this.state.drop_gmaps_id,
      drop_location_id: this.locationRef.key()
    });
  },
  render: function() {
    var fixtures = [
      {label: 'Drop It Here', location: {lat: this.state.localLat, lng: this.state.localLng}, className: 'drop-here'}        
    ];
    return <div className="location-drop">
      <div id="hidemap"></div>
      <Geosuggest 
        placeholder="+ drop location"
        fixtures={fixtures}
        onChange={this.onChange}
        location={new google.maps.LatLng(this.state.localLat,this.state.localLng)}
        radius= '1'
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
        Actions.getPlaceName(suggest.gmaps.place_id);
        LocationStore.setState({
          drop_lat: suggest.location.lat,
          drop_lng: suggest.location.lng,
          drop_label: suggest.label,
          drop_gmaps_id: suggest.gmaps.place_id,
          drop_gmaps_types: suggest.gmaps.types
        });
        this.locationExists(suggest.gmaps.place_id);
      } else {
        LocationStore.setState({
          drop_name: suggest.location.lat + ', ' + suggest.location.lng,
          drop_lat: suggest.location.lat,
          drop_lng: suggest.location.lng,
          drop_label: suggest.label,
          drop_gmaps_id: null,
          drop_gmaps_types: null,
          exists: ''
        });
      }
      this.setState({open: false})
    }
  },
  locationExists: function(gmaps_id) {
    this.locationsRef.once('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        if (childData.drop_gmaps_id === gmaps_id) {
          existsKey = key;
          LocationStore.setState({exists : existsKey});
          return existsKey;
        } else {
          LocationStore.setState({exists : ''});
          return false;
        }
      });
    });
  },
  addLocation: function() {
    if(this.state.exists === '') {
      this.locationRef.set({
        drop_name: this.state.drop_name,
        drop_lat: this.state.drop_lat,
        drop_lng: this.state.drop_lng,
        drop_label: this.state.drop_label,
        drop_gmaps_id: this.state.drop_gmaps_id,
        drop_gmaps_types: this.state.drop_gmaps_types,
      });
      this.locationRef.child('mixes_here').push(this.props.mix_key);
    } else {
      this.locationRef.remove();
      existing_locationRef = this.locationsRef.child(this.state.exists + '/mixes_here');
      existing_locationRef.push(this.props.mix_key);
    }
  },
  handleFocus: function(){
    this.setState({open: true})
  },
  handleBlur: function() {
    this.setState({open: false});
  }
});