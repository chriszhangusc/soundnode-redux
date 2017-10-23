import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GlobalOverlay from 'common/components/GlobalOverlay';
import FadeTransition from 'common/components/transitions/FadeTransition';
import { TransitionGroup } from 'react-transition-group';
import { hideOverlay } from 'features/overlay/overlayActions';

function Overlay({ active, handleOverlayClick }) {
  return (
    <div onClick={handleOverlayClick}>
      <TransitionGroup>
        {active && (
          <FadeTransition>
            <GlobalOverlay key="global-overlay" />
          </FadeTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

Overlay.propTypes = {
  active: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    active: state.overlay.active,
  };
}

const actions = {
  handleOverlayClick: hideOverlay,
};

export default connect(mapStateToProps, actions)(Overlay);
