import React from 'react';
import PropTypes from 'prop-types';
import GlobalOverlay from 'common/components/GlobalOverlay';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

function GlobalSpinnerOverlay({ hidden, children, ...rest }) {
  return (
    <ReactCSSTransitionGroup
      transitionName="overlay"
      transitionAppear
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {!hidden && (
        <GlobalOverlay key="global-spinner" {...rest}>
          {children}
        </GlobalOverlay>
      )}
    </ReactCSSTransitionGroup>
  );
}

GlobalSpinnerOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default GlobalSpinnerOverlay;
