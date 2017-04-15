import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function LinkButton({ to, children }) {
  return (
    <Link
      className="button inline link-button"
      to={to}
    >{children}</Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default LinkButton;
