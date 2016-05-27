var React = require('react');

var Reflux = require('reflux');
var StateMixin = require('reflux-state-mixin');
var CreateLocationStore = require('../../stores/createLocation-store');

var ReactFire = require('reactfire');
var Firebase = require('firebase');
var fireUrl = 'https://trailmix0.firebaseio.com/';

var Actions = require('../../actions');
var Geosuggest = require('react-geosuggest');
var GeoFire = require('geofire');


module.exports = React.createClass({
  mixins:[
    StateMixin.connect(CreateLocationStore),
    ReactFire
  ],
  componentWillMount: function() {
    // this.fbRef = new Firebase(fireUrl);
    // this.locationsRef = this.fbRef.child('locations');
    // this.geofireRef = this.fbRef.child('geofire');
    this.geoFire = new GeoFire(geofireRef);

    // this.mixLocationRef = new Firebase(this.props.mix_url + '/location');
    // console.log(this.props.loc_key);
    // this.locationRef = new Firebase(this.props.loc_url);
    this.mixLocationRef = mixesRef.child(this.props.mix_key);
    this.locationRef = locationsRef.child(this.props.loc_key);
    console.log(this.mixLocationRef.toString());
    console.log(this.locationRef.toString());
  },
  componentWillReceiveProps: function() {
  },
  componentDidMount: function() {
    this.refs.geosuggest.focus();
  },
  componentDidUpdate:function() {
    if(this.state.drop_name === '') {
      CreateLocationStore.setState({
        drop_name: this.state.localLat + ', ' + this.state.localLng,
        drop_lat: this.state.localLat,
        drop_lng: this.state.localLng,
        drop_label: 'Drop It Here',
        drop_gmaps_id: null,
        drop_gmaps_types: null,
        exists: ''
      });
    }
  },
  componentWillUnmount: function() {
    this.addLocation();
    this.mixLocationRef.set({
      drop_name: this.state.drop_name,
      drop_lat: this.state.drop_lat,
      drop_lng: this.state.drop_lng,
      drop_gmaps_id: this.state.drop_gmaps_id,
      drop_location_id: this.locationRef.key()
    });
    if(this.state.exists === '') {
      this.mixLocationRef.update({
        location_tm_key: this.locationRef.key()
      });
    } else {
      this.mixLocationRef.update({
        location_tm_key: this.state.exists
      });
    }
  },
  render: function() {
    var fixtures = [
      {label: 'Drop It Here', location: {lat: this.state.localLat, lng: this.state.localLng}, className: 'drop-here'}        
    ];
    return <div></div>
    // return <div className="location-drop">
    //   <div id="hidemap"></div>
    //   <Geosuggest 
    //     placeholder="add your drop location"
    //     fixtures={fixtures}
    //     location={new google.maps.LatLng(this.state.localLat,this.state.localLng)}
    //     radius= '1'
    //     onSuggestSelect={this.onSuggestSelect}
    //     autoActivateFirstSuggest = {true}
    //     onFocus={this.handleFocus}
    //     onBlur={this.handleBlur}
    //     className={this.state.open == true ? 'open' : ''}
    //     ref="geosuggest"
    //   />
    // </div>
  },
  onSuggestSelect: function(suggest) {
    //need an error if we have no location AND user selects drop it here
    if( this.state.localLat === null && this.state.localLng === null && suggest.placeId.includes('Drop It Here')) {
      console.log("Error getting location. Please select a specific place");
    } else {
      if (suggest.gmaps) {
        Actions.getPlaceName(suggest.gmaps.place_id);
        CreateLocationStore.setState({
          drop_lat: suggest.location.lat,
          drop_lng: suggest.location.lng,
          drop_label: suggest.label,
          drop_gmaps_id: suggest.gmaps.place_id,
          drop_gmaps_types: suggest.gmaps.types
        });
        this.locationExists(suggest.gmaps.place_id);
      } else {
        CreateLocationStore.setState({
          drop_name: suggest.location.lat + ', ' + suggest.location.lng,
          drop_lat: suggest.location.lat,
          drop_lng: suggest.location.lng,
          drop_label: suggest.label,
          drop_gmaps_id: null,
          drop_gmaps_types: null,
          exists: ''
        });
      }
      CreateLocationStore.setState({open: false})
    }
  },
  locationExists: function(gmaps_id) {
    this.locationsRef.once('value', function(snapshot){
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
        if (childData.drop_gmaps_id === gmaps_id) {
          existsKey = key;
          CreateLocationStore.setState({exists : existsKey});
          return existsKey;
        } else {
          CreateLocationStore.setState({exists : ''});
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
      this.geoFire.set(this.locationRef.key(), [this.state.drop_lat, this.state.drop_lng]).then(function() {
      }, function(error) {
        console.log("Error: " + error);
      });
    } else {
      this.locationRef.remove();
      existing_locationRef = this.locationsRef.child(this.state.exists + '/mixes_here');
      existing_locationRef.push(this.props.mix_key);
    }
  },
  handleFocus: function(){
    CreateLocationStore.setState({open: true})
  },
  handleBlur: function() {
    CreateLocationStore.setState({open: false});
  }
});