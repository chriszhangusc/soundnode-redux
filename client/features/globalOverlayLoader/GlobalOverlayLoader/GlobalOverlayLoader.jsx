import React from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { zIndexes } from 'app/css/theme';
import { connect } from 'react-redux';
import {
  isLoaderActive,
  getLoaderText,
} from 'features/globalOverlayLoader/globalOverlayLoaderSelectors';

import Loadable from './Loadable';

const FixedOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  zIndex: ${props => props.theme.zIndexes[5]};
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

class GlobalOverlayLoader extends React.Component {
  render() {
    const { active, text } = this.props;
    return (
      active && (
        <Loadable
          active
          spinner
          text={text}
          animate
          zIndex={zIndexes[5]}
        >
          <FixedOverlay />
        </Loadable>
      )
    );
  }
}

GlobalOverlayLoader.defaultProps = {
  text: '',
};

GlobalOverlayLoader.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string,
  // children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

function mapStateToProps(state) {
  return {
    active: isLoaderActive(state),
    text: getLoaderText(state),
  };
}

export default connect(mapStateToProps)(GlobalOverlayLoader);
