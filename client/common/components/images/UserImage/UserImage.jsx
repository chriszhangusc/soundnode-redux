import React from 'react';
import PropTypes from 'prop-types';
import defaultUserSrc from 'assets/images/default-avatar.png';
import Image from 'common/components/images/Image';

function UserImage(props) {
  const { size, ...rest } = props;
  return <Image fallbackSrc={defaultUserSrc} size={size} rounded {...rest} />;
}

UserImage.defaultProps = {
  size: 'small',
};

UserImage.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fluid']),
};

export default UserImage;
