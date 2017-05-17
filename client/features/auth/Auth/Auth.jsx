import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AUTH_CALLBACK_ROUTE } from 'client/common/constants/RouteConsts';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { login } from '../authActions';

const AuthWrapper = styled.div`
  padding: 23px 0;
`;

function Auth({ onLogin }) {
  // return <Link onClick={onLogin} to="/charts">Login</Link>;
  return (
    <AuthWrapper>
      <a onClick={onLogin}>Login</a>
    </AuthWrapper>
  );
}

Auth.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogin: bindActionCreators(login, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
