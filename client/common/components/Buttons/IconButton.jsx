import React from 'react';
import PropTypes from 'prop-types';
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

IconButton.propTypes = {
  title: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  btnClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
