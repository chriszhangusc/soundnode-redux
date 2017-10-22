import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GlobalOverlay from 'common/components/GlobalOverlay';
import FadeTransition from 'common/components/transitions/FadeTransition';
import { TransitionGroup } from 'react-transition-group';
import { hideOverlay } from 'features/overlay/overlayActions';

function Overlay({ isActive, handleOverlayClick }) {
  return (
    <div onClick={handleOverlayClick}>
      <TransitionGroup>
        {isActive && (
          <FadeTransition>
            <GlobalOverlay key="global-overlay" />
          </FadeTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

Overlay.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    isActive: state.overlay.isActive,
  };
}

const actions = {
  handleOverlayClick: hideOverlay,
};

export default connect(mapStateToProps, actions)(Overlay);
