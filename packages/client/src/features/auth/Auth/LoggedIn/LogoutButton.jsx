import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RouterLink from '@soundnode-redux/client/src/common/components/links/RouterLink';
import { doLogout } from '@soundnode-redux/client/src/features/auth/authActions';

function LogoutButton({ onLogout }) {
  return (
    <RouterLink to="/" onClick={onLogout}>
      Logout
    </RouterLink>
  );
}

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLogout: bindActionCreators(doLogout, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(LogoutButton);
