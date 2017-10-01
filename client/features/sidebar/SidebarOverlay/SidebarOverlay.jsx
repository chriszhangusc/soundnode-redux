import React from 'react';
import PropTypes from 'prop-types';
import GlobalOverlay from 'common/components/GlobalOverlay';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { TransitionGroup } from 'react-transition-group';

function SidebarOverlay(props) {
  return <GlobalOverlay key="sidebar" {...props} />;
}

SidebarOverlay.propTypes = {
  hidden: PropTypes.bool.isRequired,
};

export default SidebarOverlay;
