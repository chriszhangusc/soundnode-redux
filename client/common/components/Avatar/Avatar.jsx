import React from 'react';
import PropTypes from 'prop-types';
// import { getNormalVersion } from 'client/common/utils/ImageUtils';
import { defaultArtistImageUrl } from 'client/common/constants/ImageConsts';

// Change to fallback image!
const Avatar = ({ src, alt }) => {
  // console.log(src);
  return (
    <img alt="Avatar" className="avatar" src={src || defaultArtistImageUrl} />
  );
};

Avatar.defaultProps = {
  alt: 'avatar',
  src: defaultArtistImageUrl,
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
