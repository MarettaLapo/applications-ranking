import React from 'react';

class Task extends React.Component {
  render() {
    return (
      <div className="list-group-item">
        {this.props.i}. {this.props.title} ({this.props.description})
      </div>
    )
  }
}

export default Task;
