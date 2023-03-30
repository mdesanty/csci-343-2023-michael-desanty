import React from 'react';

class Description extends React.Component {
  render() {
    return <h3 class='description'>{this.props.description}</h3>
  }
}

export default Description;