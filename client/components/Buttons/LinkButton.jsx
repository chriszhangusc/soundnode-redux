import React from 'react';
import PropTypes from 'prop-types';
// import shortid from 'shortid';
import { Link } from 'react-router-dom';

const LinkButton = ({ to, children }) => (
  <Link
    className="button inline link-button"
    to={to}
  >{children}</Link>
);

LinkButton.propTypes = {
  // key: PropTypes.string,
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

// LinkButton.defaultProps = {
// };

export default LinkButton;
