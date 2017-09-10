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
    // ReactCSSTransitionGroup must be mounted for it to take effect.
    return <Overlay key="overlay" {...this.props} />;
  }
}

export default GlobalOverlay;
