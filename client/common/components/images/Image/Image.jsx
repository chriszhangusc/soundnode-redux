import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledImage = styled.img`
  width: ${props => (props.fluid ? '100%' : props.width)};
  height: ${props => (props.fluid ? '100%' : props.height)};
  border-radius: ${props => props.rounded && '50%'};
  display: inline-block;
`;

function Image(props) {
  // const { alt, src, height, width, fluid, rounded, linkTo } = props;
  const { linkTo } = props;
  return linkTo
    ? <Link to={linkTo}><StyledImage {...props} /></Link>
    : <div><StyledImage {...props} /></div>;
}

Image.propTypes = {
  // width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  linkTo: PropTypes.string,
};

export default Image;
