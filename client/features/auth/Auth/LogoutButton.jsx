import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { doLogout } from '../authActions';

function LogoutButton({ onLogout }) {
  return <Link to="/" onClick={onLogout}>Logout</Link>;
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
