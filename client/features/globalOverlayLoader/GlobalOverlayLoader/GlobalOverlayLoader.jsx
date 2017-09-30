import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  isLoaderActive,
  getLoaderText,
} from 'features/globalOverlayLoader/globalOverlayLoaderSelectors';
import Spinner from './Spinner';
import GlobalSpinnerOverlay from './GlobalSpinnerOverlay';

const ContentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${props => props.theme.zIndexes[5]};
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

const Text = styled.div`color: ${props => props.theme.colors.fontColor};`;

function GlobalOverlayLoader({ active, text }) {
  return (
    <GlobalSpinnerOverlay hidden={!active}>
      <ContentWrapper>
        <Spinner />
        <Text>{text}</Text>
      </ContentWrapper>
    </GlobalSpinnerOverlay>
  );
}

GlobalOverlayLoader.defaultProps = {
  text: '',
};

GlobalOverlayLoader.propTypes = {
  active: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    active: isLoaderActive(state),
    text: getLoaderText(state),
  };
}

export default connect(mapStateToProps)(GlobalOverlayLoader);
