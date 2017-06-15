import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loadable from 'react-loading-overlay';
import { connect } from 'react-redux';
import { isLoginInProgress } from 'client/features/auth/authSelectors';

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
`;

const customizedStyle = {
};

function OverlayLoader({ loading }) {
  return <Loadable active spinner animate style={customizedStyle} zIndex={9999} />;
}

function mapStateToProps(state) {
  return {
    loading: isLoginInProgress(state),
  };
}

export default connect(mapStateToProps)(OverlayLoader);
