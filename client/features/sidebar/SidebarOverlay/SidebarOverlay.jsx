import React from 'react';
import PropTypes from 'prop-types';
import GlobalOverlay from 'common/components/GlobalOverlay';
import FadeTransition from 'common/components/transitions/FadeTransition';
import { TransitionGroup } from 'react-transition-group';

function SidebarOverlay(props) {
  return (
    <TransitionGroup>
      {!props.hidden &&
        <FadeTransition>
          <GlobalOverlay {...props} />
        </FadeTransition>}
    </TransitionGroup>
  );
}

SidebarOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default SidebarOverlay;
