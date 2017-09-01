import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'common/components/links/RouterLink';

function LoginButton({ handleLogin }) {
  return (
    <RouterLink to="/" onClick={handleLogin}>
      Login
    </RouterLink>
  );
}

LoginButton.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginButton;
