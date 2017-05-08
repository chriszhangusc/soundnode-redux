import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkButton({ to, children, onClick }) {
  return (
    <Link
      className="button inline link-button"
      to={to}
      onClick={onClick}
    >{children}</Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

export default LinkButton;
