import React from 'react';
// import { TransitionGroup } from 'react-transition-group';
import FadeTransition from 'common/components/transitions/FadeTransition';
import Overlay from './Overlay';

class GlobalOverlay extends React.Component {
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'scroll';
  }

  render() {
    return (
      <FadeTransition in={!this.props.hidden}>
        <Overlay key="overlay" {...this.props} />
      </FadeTransition>
    );
  }
}

export default GlobalOverlay;
