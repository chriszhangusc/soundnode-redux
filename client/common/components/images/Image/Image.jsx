import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from 'common/components/links/ExternalLink';
import RouterLink from 'common/components/links/RouterLink';
import { compose } from 'recompose';
import withImageFadeInOnLoad from 'common/hocs/withImageFadeInOnLoad';
import withImageFallbackOnError from 'common/hocs/withImageFallbackOnError';

const StyledImage = styled.img`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  border-radius: ${props => props.rounded && '50%'};
  display: inline-block;
  opacity: ${props => (props.loaded ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

// Size tiny small medium large
function getWidthAndHeight(size) {
  switch (size) {
    case 'small':
      return 32;
    case 'medium':
      return 206;
    case 'large':
      return 350;
    case 'fluid':
      return '100%';
    default:
      return null;
  }
}

// const cdnPrefix = 'http://res.cloudinary.com/drijsmsvv/image/fetch/w_400/';
function Image(props) {
  const { linkTo, externalLink, src, size, ...rest } = props;
  const WrapperLink = externalLink ? ExternalLink : RouterLink;
  const widthAndHeight = getWidthAndHeight(size);

  // Reduce the image size by using cdn to resize.
  // const img = <StyledImage src={`${cdnPrefix}${props.src}`} {...rest} />;
  const img = <StyledImage src={src} width={widthAndHeight} height={widthAndHeight} {...rest} />;

  if (linkTo) {
    // Wrap within a link
    return (
      <WrapperLink to={linkTo}>
        {img}
      </WrapperLink>
    );
  }
  return img;
}

Image.defaultProps = {
  // width: '100%',
  // height: '100%',
  linkTo: null,
  loaded: false,
  size: 'fluid',
  // Not used yet
  fadeIn: true,
  externalLink: false,
  fallbackSrc: null,
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fluid']),
  // width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loaded: PropTypes.bool,
  fadeIn: PropTypes.bool,
  linkTo: PropTypes.string,
  externalLink: PropTypes.bool,
};

export default compose(withImageFallbackOnError, withImageFadeInOnLoad)(Image);
