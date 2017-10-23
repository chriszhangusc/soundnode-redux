import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { isLoaderActive, getLoaderText } from 'features/loadingOverlay/loadingOverlaySelectors';
import Spinner from 'common/components/spinners/CircleRotate';
import FadeTransition from 'common/components/transitions/FadeTransition';
import { TransitionGroup } from 'react-transition-group';

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
function LoadingOverlay({ isActive, text = 'Authenticating' }) {
  return (
    <TransitionGroup>
      {isActive && (
        <FadeTransition>
          <ContentWrapper>
            <Spinner />
            <Text>{text}</Text>
          </ContentWrapper>
        </FadeTransition>
      )}
    </TransitionGroup>
  );
}

LoadingOverlay.defaultProps = {
  text: '',
};

LoadingOverlay.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    isActive: isLoaderActive(state),
    text: getLoaderText(state),
  };
}

export default connect(mapStateToProps)(LoadingOverlay);
