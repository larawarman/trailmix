var React = require('react');
var Reflux = require('reflux');

module.exports = React.createClass({
  render: function() {
    return <div className="row">
      <div className="col-md-6 col-md-offset-3">
        {this.renderList()}
      </div>
    </div>
  },
  renderList: function() {
    if(!this.props.items) {
      return null
    } else {
      var children = [];
      for (var key in this.props.items)  {
        var item = this.props.items[key];
        item.key = key;
        
        children.push(
          <div
            item={item}
            key={key}
          >
          </div>
        )
      }
      return children;
    }
  }
});