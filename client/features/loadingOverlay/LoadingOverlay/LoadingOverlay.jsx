import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import GlobalOverlay from 'common/components/GlobalOverlay';
import { isLoaderActive, getLoaderText } from 'features/loadingOverlay/loadingOverlaySelectors';
import Spinner from 'common/components/spinners/CircleRotate';
import withFadeTransition from 'common/hocs/withFadeTransition';
import { compose } from 'recompose';

const ContentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${props => props.theme.zIndexes.fullScreenLoadingOverlay};
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
`;

const Text = styled.div`
  color: ${props => props.theme.colors.fontColor};
  font-size: 1.1rem;
`;

function LoadingOverlay({ text }) {
  return (
    <GlobalOverlay>
      <ContentWrapper>
        <Spinner />
        <Text>{text}</Text>
      </ContentWrapper>
    </GlobalOverlay>
  );
}

LoadingOverlay.defaultProps = {
  text: '',
};

LoadingOverlay.propTypes = {
  text: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    active: isLoaderActive(state),
    text: getLoaderText(state),
  };
}

export default compose(connect(mapStateToProps), withFadeTransition)(LoadingOverlay);
