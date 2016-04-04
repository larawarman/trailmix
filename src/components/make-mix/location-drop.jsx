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
  getInitialState:function() {
    return {
      needs_to_exist: false
    }
  },
  componentWillMount: function() {
    this.fbloc = new Firebase(this.props.mix_url + '/location');
    //this.bindAsObject(this.fbloc, 'location');
    //this.fbloc.on('value', this.handleDataLoaded);
    this.loc_ref = new Firebase(fireUrl + '/locations');
    this.bindAsObject(this.loc_ref, 'locations');
    // this.loc_ref.on('value', this.handleLocRefLoaded);
  },
  componentDidUpdate: function() {
    this.fbloc.update({name: this.state.name});
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
        this.updateLocation(suggest);
        this.fbloc.update({
          lat: suggest.location.lat,
          lng: suggest.location.lng,
          label: suggest.label,
          gmaps_place_id: suggest.gmaps.place_id,
          types: suggest.gmaps.types
        });
      } else {
        this.fbloc.update({
          lat: suggest.location.lat,
          lng: suggest.location.lng,
          label: suggest.label,
          gmaps_place_id: null,
          types: null,
          name: suggest.location.lat + ', ' + suggest.location.lng
        });
      }
      this.setState({open: false})
    }
  },
  locationExists: function(suggest) {
    var existsA = null;
    var existsKey = '';
    this.loc_ref.once('value', function(snapshot){
      var existsB = snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        if (childData.gmaps_place_id === suggest.gmaps.place_id) {
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
  },
  updateLocation: function(suggest) {
    var exists = this.locationExists(suggest);
    console.log(exists);
    if(exists === false) {
      this.loc_ref.push({
        lat: suggest.location.lat,
        lng: suggest.location.lng,
        label: suggest.label,
        gmaps_place_id: suggest.gmaps.place_id,
        types: suggest.gmaps.types,
        mixes_here: this.props.mix_key
      });
    } 
    if( (exists !== '') && (exists !== false) ) {
      //console.log(exists)
      //push the mix to the mixes_here array
      existing_loc_ref = this.loc_ref.child(exists + '/mixes_here');
      existing_loc_ref.push(this.props.mix_key);
    }
  },
  handleFocus: function(){
    this.setState({open: true})
  },
  handleBlur: function() {
    this.setState({open: false})
  },
  // handleLocRefLoaded: function(snapshot) {
  //   //this.setState({displayLabel: snapshot.val().label});
  // }
});