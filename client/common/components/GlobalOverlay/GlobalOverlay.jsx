import React from 'react';
import Overlay from './Overlay';

class GlobalOverlay extends React.Component {
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'scroll';
  }

  render() {
    return <Overlay {...this.props} />;
  }
}

export default GlobalOverlay;
