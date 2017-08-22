import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserImage from 'common/components/images/UserImage';
import RouterLink from 'common/components/links/RouterLink';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from 'common/constants/routeConsts';
import { doLogin, loginIfNeeded } from '../authActions';
import { getMe } from '../authSelectors';
import LogoutButton from './LogoutButton';
import Wrapper from './Wrapper';
import AvatarWrapper from './AvatarWrapper';
import Username from './Username';

class Auth extends React.Component {
  componentDidMount() {
    const { syncLoginIfNeeded } = this.props;
    syncLoginIfNeeded();
  }

  render() {
    const { me, onLogin } = this.props;

    const renderLoggedIn = () =>
      <Wrapper>
        <AvatarWrapper>
          <UserImage src={me.avatarUrl} linkTo={`${USER_PROFILE_ROUTE}/${me.id}`} size="small" />
        </AvatarWrapper>
        <Username>
          {me.username}
        </Username>
        <LogoutButton />
      </Wrapper>;

    const renderLoggedOut = () =>
      <Wrapper>
        <RouterLink to="/" onClick={onLogin}>
          Login
        </RouterLink>
      </Wrapper>;

    return me ? renderLoggedIn() : renderLoggedOut();
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
