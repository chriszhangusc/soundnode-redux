import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doLogin } from '@soundnode-redux/client/src/features/auth/authActions';
import LoginButton from './LoginButton';

function LoggedOut({ handleLogin }) {
  return <LoginButton handleLogin={handleLogin} />;
}

LoggedOut.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default connect(null, { handleLogin: doLogin })(LoggedOut);
