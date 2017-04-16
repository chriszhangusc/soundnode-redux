import React from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
import FontAwesome from 'react-fontawesome';
import styles from './IconButton.css';

function FontAwesomeButton({ title, name, active, onClick }) {
  return (
    <button
      className={active ? styles.iconButtonActive : styles.iconButton}
      title={title}
      onClick={onClick}
    >
      <FontAwesome name={name} />
    </button>
  );
}

FontAwesomeButton.defaultProps = {
  active: false,
  title: '',
  onClick: defaultEventHandlerFactory('onClick'),
};

FontAwesomeButton.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default FontAwesomeButton;
