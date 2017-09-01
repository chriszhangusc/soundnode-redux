import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginIfNeeded } from 'features/auth/authActions';
import { getMe } from '../authSelectors';
import Wrapper from './Wrapper';
import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

class Auth extends React.Component {
  componentDidMount() {
    this.props.loginIfNeeded();
  }

  render() {
    const { me } = this.props;
    return (
      <Wrapper>
        {me ? <LoggedIn me={me} /> : <LoggedOut />}
      </Wrapper>
    );
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
  loginIfNeeded: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    me: getMe(state),
  };
}

export default connect(mapStateToProps, { loginIfNeeded })(Auth);
