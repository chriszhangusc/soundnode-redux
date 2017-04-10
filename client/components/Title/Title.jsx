import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ text }) => (
  <h1>{ text }</h1>
);

Title.defaultProps = {
  text: '',
};

Title.propTypes = {
  text: PropTypes.string,
};

export default Title;
