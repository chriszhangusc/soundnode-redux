import React from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/common/utils/FactoryUtils';
import styles from './IconButton.css';

function IconButton({ title, btnClassName, iconClassName, onClick }) {
  return (
    <button
      title={title}
      className={`${styles.iconButton} ${btnClassName}`}
      onClick={onClick}
    >
      {iconClassName && <i className={iconClassName} />}
    </button>
  );
}

IconButton.defaultProps = {
  title: '',
  iconClassName: '',
  btnClassName: '',
  onClick: defaultEventHandlerFactory('onClick'),
};

IconButton.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string,
  btnClassName: PropTypes.string,
  onClick: PropTypes.func,
};

export default IconButton;
