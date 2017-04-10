import React from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';

const IconButton = ({ title, iconClassName, onClick }) => (
  <button
    title={title}
    className="icon-button"
    onClick={onClick}
  >
    {iconClassName && <i className={iconClassName} />}
  </button>
);

IconButton.defaultProps = {
  title: '',
  iconClassName: '',
  onClick: defaultEventHandlerFactory('onClick'),
};

IconButton.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconButton;
