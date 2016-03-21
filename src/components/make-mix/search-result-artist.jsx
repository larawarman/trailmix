var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <div>
      {this.renderArtists()}
    </div>
  },
  renderArtists: function() {
    // var children = [];
    for (var key in this.props.artists)  {
      var item = this.props.artists[key];
      console.log(item);
      // children.push(
      //   <span>{name}
      //   </span>
      // )
    }
    // return children;
  }
});