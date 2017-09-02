import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loading-overlay';
import { zIndexes } from 'app/css/theme';
import { connect } from 'react-redux';
import {
  isLoaderActive,
  getLoaderText,
} from 'features/globalOverlayLoader/globalOverlayLoaderSelectors';

function GlobalOverlayLoader({ active, text, children }) {
  return (
    <Loadable active={active} spinner text={text} animate zIndex={zIndexes[5]}>
      {children}
    </Loadable>
  );
}

GlobalOverlayLoader.defaultProps = {
  text: '',
};

GlobalOverlayLoader.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

function mapStateToProps(state) {
  return {
    active: isLoaderActive(state),
    text: getLoaderText(state),
  };
}

export default connect(mapStateToProps)(GlobalOverlayLoader);
