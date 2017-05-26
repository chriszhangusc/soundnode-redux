import React from 'react';
import PropTypes from 'prop-types';
// import { getNormalVersion } from 'client/common/utils/imageUtils';
import { defaultArtistImageUrl } from 'client/common/constants/imageConsts';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

// Change to fallback image!
const Avatar = ({ src, alt }) => <StyledImage alt={alt} src={src} />;

Avatar.defaultProps = {
  alt: 'avatar',
  src: defaultArtistImageUrl,
};

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

export default Avatar;
