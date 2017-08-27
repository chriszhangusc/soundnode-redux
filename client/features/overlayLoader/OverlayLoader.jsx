import React from 'react';
import Loadable from 'react-loading-overlay';
import { zIndexes } from 'app/css/theme';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function OverlayLoader({ active, text, children }) {
  return (
    <Loadable active={active} spinner text={text} animate zIndex={zIndexes[5]}>
      {children}
    </Loadable>
  );
}

OverlayLoader.defaultProps = {
  text: '',
};

OverlayLoader.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

function mapStateToProps(state) {
  return {
    active: state.overlayLoader.active,
    text: state.overlayLoader.text,
  };
}

export default connect(mapStateToProps)(OverlayLoader);
