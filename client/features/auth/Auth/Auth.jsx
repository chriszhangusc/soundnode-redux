import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'client/common/components/Avatar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from 'client/common/constants/routeConsts';
import { doLogin, doLogout, loginIfNeeded } from '../authActions';
import { getMe } from '../authSelectors';

const AuthWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 23px 0;
  margin-left: 20px;
`;

const Username = styled.span`
  margin: 0 10px;
`;

const LogoutButton = styled.a`

`;

const AvatarWrapper = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
`;

class Auth extends React.Component {
  componentWillMount() {
    const { syncLoginIfNeeded } = this.props;
    // console.log('componentWillMount');
    syncLoginIfNeeded();
  }

  render() {
    const { me, onLogin, onLogout } = this.props;

    const loggedIn = () => (
      <AuthWrapper>
        <AvatarWrapper>
          <Link to={`${USER_PROFILE_ROUTE}/${me.id}`}>
            <Avatar src={me.avatarUrl} />
          </Link>
        </AvatarWrapper>
        <Username>{me.username}</Username>
        <LogoutButton onClick={onLogout}>Logout</LogoutButton>
      </AuthWrapper>
    );

    const loggedOut = () => (
      <AuthWrapper>
        <a onClick={onLogin}>Login</a>
      </AuthWrapper>
    );

    return me ? loggedIn() : loggedOut();
  }
}

Auth.defaultProps = {
  me: null,
};

Auth.propTypes = {
  me: PropTypes.object,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  syncLoginIfNeeded: PropTypes.func.isRequired,
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
    syncLoginIfNeeded: bindActionCreators(loginIfNeeded, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
