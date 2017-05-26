import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledUsername = styled.span`
  margin: 10px 0;
  font-size: 1.5rem;
`;

function TrackUsername({ children, to }) {
  return <StyledUsername><Link to={to}>{children}</Link></StyledUsername>;
}

TrackUsername.defaultProps = {
  children: '',
  to: '',
};

TrackUsername.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
};

export default TrackUsername;
