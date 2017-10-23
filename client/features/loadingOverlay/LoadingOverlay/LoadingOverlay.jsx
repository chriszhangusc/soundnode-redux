import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isLoaderActive, getLoaderText } from 'features/loadingOverlay/loadingOverlaySelectors';
import Spinner from 'common/components/spinners/CircleRotate';

const ContentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${props => props.theme.zIndexes[6]};
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

const Text = styled.div`color: ${props => props.theme.colors.fontColor};`;

// FIXME: Decouple global overlay from globalSpinner
function LoadingOverlay({ active, text = 'Authenticating' }) {
  const overlay = (
    <ContentWrapper>
      <Spinner />
      <Text>{text}</Text>
    </ContentWrapper>
  );

  return active && overlay;
}

LoadingOverlay.defaultProps = {
  text: '',
};

LoadingOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    active: isLoaderActive(state),
    text: getLoaderText(state),
  };
}

export default connect(mapStateToProps)(LoadingOverlay);
