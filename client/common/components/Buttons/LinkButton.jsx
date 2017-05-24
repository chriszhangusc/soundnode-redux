import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkButton({ to, children, onClick }) {
  return <Link className="button inline link-button" to={to} onClick={onClick}>{children}</Link>;
}

LinkButton.defaultProps = {
  children: '',
  onClick: () => {},
  to: '',
};

LinkButton.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default LinkButton;
