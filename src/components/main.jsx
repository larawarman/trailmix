var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var ReactFire = require('reactfire');
var Firebase = require('firebase');

var fireUrl = 'https://trailmix0.firebaseio.com/';


module.exports = React.createClass({
  mixins: [ ReactFire ],
  componentWillMount: function() {
    // this.fbmix = new Firebase(fireUrl + '/mixes/');
    // this.bindAsObject(this.fbmix, 'mix');
    // this.fbmix.on('value', this.handleDataLoaded);
  },
  getInitialState: function() {
    return {
      mix: {},
      mixId : ''
    }
  },
  render: function() {
    return <div>
      {this.content()}
    </div>
  },
  content: function() {
    if(this.props.children) {
      return this.props.children
    } else {
      return <div>
        <h1>welcome to trailmix</h1>
        <Link to="/make-mix/new" className="navbar-brand">
          make ur mix
        </Link>
      </div>
      // return <div>
      //   <h1>welcome to trailmix</h1>
      //   <button onClick={this.handleMakeMix}>
      //     make ur mix
      //   </button>
      // </div>
    }
  }
  // handleMakeMix: function() {
  //   this.fbmix.push({editing:true}, function(){
  //     //console.log('key: ' + this.state.mix.key);
  //     // this.setState({mixId: mix.key})
  //   });
  // },
  // handleDataLoaded: function(snapshot) {
  //   // console.log(snapshot.val())
  //   if(snapshot.val() !== undefined){
  //     console.log("whole val: " + snapshot.val());
  //     console.log("id: " + snapshot.key());
  //   }
  // }
});