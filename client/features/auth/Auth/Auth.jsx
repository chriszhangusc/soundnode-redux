import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'client/common/components/Avatar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from 'client/common/constants/routeConsts';

import { doLogin, doLogout } from '../authActions';
import { getMe } from '../authSelectors';

const AuthWrapper = styled.div`
  display: inline-block;
  padding: 23px 0;
  margin-left: 20px;
`;

const Username = styled.span`
  margin: 0 10px;
`;

const LogoutButton = styled.a`

`;

function Auth({ me, onLogin, onLogout }) {
  const loggedIn = () => (
    <div>
      <Link to={`${USER_PROFILE_ROUTE}/${me.id}`}><Avatar src={me.avatar_url} /></Link>
      <Username>{me.username}</Username>
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    </div>
  );

  const loggedOut = () => <a onClick={onLogin}>Login</a>;

  return (
    <AuthWrapper>
      {me ? loggedIn() : loggedOut()}
    </AuthWrapper>
  );
}

Auth.defaultProps = {
  me: null,
};

Auth.propTypes = {
  me: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    me: getMe(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: bindActionCreators(doLogin, dispatch),
    onLogout: bindActionCreators(doLogout, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
