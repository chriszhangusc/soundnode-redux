import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ExternalLink from 'common/components/links/ExternalLink';
import RouterLink from 'common/components/links/RouterLink';
import { compose } from 'recompose';

import withImageFadeInOnLoad from 'common/hocs/withImageFadeInOnLoad';
import withImageFallbackOnError from 'common/hocs/withImageFallbackOnError';

const StyledImage = styled.img`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: ${props => props.rounded && '50%'};
  display: inline-block;
  opacity: ${props => (props.loaded ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

function Image(props) {
  const { linkTo, external } = props;
  const WrapperLink = external ? ExternalLink : RouterLink;

  if (linkTo) {
    // Wrap within a link
    return (
      <WrapperLink to={linkTo}>
        <StyledImage {...props} />
      </WrapperLink>
    );
  }
  return <StyledImage {...props} />;
}

Image.defaultProps = {
  width: '100%',
  height: '100%',
  loaded: false,
  fadeIn: true,
  linkTo: undefined,
  external: false,
};

Image.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loaded: PropTypes.bool,
  fadeIn: PropTypes.bool,
  linkTo: PropTypes.string,
  external: PropTypes.bool,
};

// export default withImageFallbackOnError(withImageFadeInOnLoad(Image));
export default compose(withImageFallbackOnError, withImageFadeInOnLoad)(Image);
