import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Avatar from 'common/components/images/Avatar';
import RouterLink from 'common/components/links/RouterLink';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import { doLogin, loginIfNeeded } from '../authActions';
import { getMe } from '../authSelectors';
import LogoutButton from './LogoutButton';

const AuthWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 23px 0;
  margin-left: 20px;
`;

const Username = styled.span`
  margin: 0 10px;
`;

const AvatarWrapper = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
`;

class Auth extends React.Component {
  componentWillMount() {
    const { syncLoginIfNeeded } = this.props;
    syncLoginIfNeeded();
  }

  render() {
    const { me, onLogin } = this.props;

    const loggedIn = () => (
      <AuthWrapper>
        <AvatarWrapper>
          <RouterLink to={`${USER_PROFILE_ROUTE}/${me.id}`}>
            <Avatar src={me.avatarUrl} />
          </RouterLink>
        </AvatarWrapper>
        <Username>{me.username}</Username>
        <LogoutButton />
      </AuthWrapper>
    );

    const loggedOut = () => (
      <AuthWrapper>
        <RouterLink to="/" onClick={onLogin}>Login</RouterLink>
      </AuthWrapper>
    );

    return me ? loggedIn() : loggedOut();
  }
}

Auth.defaultProps = {
  me: null,
};

Auth.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  onLogin: PropTypes.func.isRequired,
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
    syncLoginIfNeeded: bindActionCreators(loginIfNeeded, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
