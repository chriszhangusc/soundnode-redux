import React from 'react';
import PropTypes from 'prop-types';
import GlobalOverlay from 'common/components/GlobalOverlay';
import { TransitionGroup } from 'react-transition-group';
import FadeTransition from 'common/components/transitions/FadeTransition';

function GlobalSpinnerOverlay({ hidden, children, ...rest }) {
  const overlay = (
    <FadeTransition>
      <GlobalOverlay key="global-spinner" {...rest}>
        {children}
      </GlobalOverlay>
    </FadeTransition>
  );
  return (
    <TransitionGroup>
      {!hidden && overlay}
    </TransitionGroup>
  );
}

GlobalSpinnerOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default GlobalSpinnerOverlay;
