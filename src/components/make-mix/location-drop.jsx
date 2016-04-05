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
    this.fbloc = new Firebase(this.props.mix_url + '/location');
    //this.bindAsObject(this.fbloc, 'location');
    this.loc_ref = new Firebase(fireUrl + '/locations');
    this.bindAsObject(this.loc_ref, 'locations');
  },
  componentWillUnmount: function() {
    //UPDATE THE DB, PRESUMING MIX IS PUBLISHED? NEED TO MOVE THIS TO MAKE-MIX-MAIN PROB
    this.addLocation();
    this.fbloc.set({
      drop_name: this.state.drop_name,
      drop_lat: this.state.drop_lat,
      drop_lng: this.state.drop_lng,
      drop_gmaps_id: this.state.drop_gmaps_id,
    });
  },
  render: function() {
    var fixtures = [
      {label: 'Drop It Here', location: {lat: this.state.localLat, lng: this.state.localLng}, className: 'drop-here'}        
    ];
    return <div className="location-drop">
      <div id="hidemap"></div>
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
        Actions.getPlaceName(suggest.gmaps.place_id);
        LocationStore.setState({
          drop_lat: suggest.location.lat,
          drop_lng: suggest.location.lng,
          drop_label: suggest.label,
          drop_gmaps_id: suggest.gmaps.place_id,
          drop_gmaps_types: suggest.gmaps.types
        });
      } else {
        LocationStore.setState({
          drop_name: suggest.location.lat + ', ' + suggest.location.lng,
          drop_lat: suggest.location.lat,
          drop_lng: suggest.location.lng,
          drop_label: suggest.label,
          drop_gmaps_id: null,
          drop_gmaps_types: null
        });
      }
      this.setState({open: false})
    }
  },
  locationExists: function() {
    var existsA = null;
    var existsKey = '';
    if(this.state.drop_gmaps_id) {
      var curr_gmaps_id = this.state.drop_gmaps_id;
      this.loc_ref.once('value', function(snapshot){
        var existsB = snapshot.forEach(function(childSnapshot) {
          var key = childSnapshot.key();
          var childData = childSnapshot.val();
          if (childData.drop_gmaps_id === curr_gmaps_id) {
            existsKey = key;
            return true;
          } else {
            return false;
          }
        });
        if (existsB) {
          existsA = true;
          return existsA
        } else {
          existsA = false;
          return existsA
        }
      });
      if (existsA) {
        return existsKey;
      } else {
        return false;
      }
    }
  },
  addLocation: function() {
    var exists = this.locationExists();
    // console.log(exists);
    if(exists === false) {
      this.loc_ref.push({
        drop_name: this.state.drop_name,
        drop_lat: this.state.drop_lat,
        drop_lng: this.state.drop_lng,
        drop_label: this.state.drop_label,
        drop_gmaps_id: this.state.drop_gmaps_id,
        drop_gmaps_types: this.state.drop_gmaps_types,
        mixes_here: {
          mix: this.props.mix_key
        }
      });
    } 
    if( exists && (exists !== '') && (exists !== false) ) {
      existing_loc_ref = this.loc_ref.child(exists + '/mixes_here');
      existing_loc_ref.push(this.props.mix_key);
    }
  },
  handleFocus: function(){
    this.setState({open: true})
  },
  handleBlur: function() {
    this.setState({open: false})
  }
});