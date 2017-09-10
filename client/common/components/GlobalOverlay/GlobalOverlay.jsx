import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
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
      <ReactCSSTransitionGroup
        transitionName="overlay"
        transitionAppear
        transitionAppearTimeout={500}
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        <Overlay key="overlay" {...this.props} />
      </ReactCSSTransitionGroup>
    );
  }
}

export default GlobalOverlay;
