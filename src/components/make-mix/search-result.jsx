var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      artists: ''
    }
  },
  componentWillMount: function() {
    var artistArr = [];
    for (var key in this.props.artists)  {
      var item = this.props.artists[key];
      artistArr.push(item.name);
    }
    var artists = artistArr.join(' + ');
    this.setState({
      artists: artists
    }); 
  },
  render: function() {
    return <div className="search-result">
      {this.props.name} by {this.state.artists}
    </div>
  }
});