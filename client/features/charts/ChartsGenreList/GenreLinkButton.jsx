import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GRAY } from 'client/app/css/colors';

// className="button inline link-button"
const StyledLinkButton = styled(Link)`
  display: inline-block;
  width: 19%;
  border: 1px solid;
  border-radius: 3px;
  margin: 5px;
  text-align: center;
  margin: 5px 5px 0 0;
  padding: .4em .75em;
  font-size: 0.75rem;
  transition: color 200ms ease-in;
  &:hover {
    color: ${GRAY};
    cursor: pointer;
  }
`;

function GenreLinkButton({ to, children, onClick }) {
  return <StyledLinkButton to={to} onClick={onClick}>{children}</StyledLinkButton>;
}

GenreLinkButton.defaultProps = {
  children: '',
  onClick: () => {},
  to: '',
};

GenreLinkButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default GenreLinkButton;
