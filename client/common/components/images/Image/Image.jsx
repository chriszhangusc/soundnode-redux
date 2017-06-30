import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const DivWrapper = styled.div`
`;

const LinkedWrapper = DivWrapper.withComponent(Link);

function Image(props) {
  const { linkTo } = props;
  const Wrapper = linkTo ? LinkedWrapper : DivWrapper;
  return (
    <Wrapper to={linkTo}>
      <StyledImage {...props} />
    </Wrapper>
  );
}

Image.defaultProps = {
  width: '100%',
  height: '100%',
  loaded: false,
  fadeIn: true,
  linkTo: undefined,
};

Image.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  loaded: PropTypes.bool,
  fadeIn: PropTypes.bool,
  linkTo: PropTypes.string,
};

// export default withImageFallbackOnError(withImageFadeInOnLoad(Image));
export default compose(withImageFallbackOnError, withImageFadeInOnLoad)(Image);
