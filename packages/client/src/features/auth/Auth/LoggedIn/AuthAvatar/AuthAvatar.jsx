import React from 'react';
import PropTypes from 'prop-types';
import { USER_PROFILE_ROUTE } from '@soundnode-redux/client/src/common/constants/routeConsts';
import UserImage from '@soundnode-redux/client/src/common/components/images/UserImage';
import Wrapper from './Wrapper';

function AuthAvatar({ me }) {
  return (
    <Wrapper>
      <UserImage src={me.avatarUrl} linkTo={`${USER_PROFILE_ROUTE}/${me.id}`} size="tiny" />
    </Wrapper>
  );
}

AuthAvatar.defaultProps = {
  me: null,
};

AuthAvatar.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};

export default AuthAvatar;
