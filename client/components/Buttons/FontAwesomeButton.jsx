import React from 'react';
import PropTypes from 'prop-types';
import { defaultEventHandlerFactory } from 'client/utils/FactoryUtils';
import FontAwesome from 'react-fontawesome';
// import styles from './IconButton.css';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY, THEME_COLOR } from 'client/constants/Colors';
// .icon-button {
//   color: font-color-primary;
//   padding: 4px;
//   border: none;
//   outline: none;
//   background-color: transparent;
//   cursor: pointer;
//   margin: 0 auto;
//   text-align: center;
// }

// .icon-button-active {
//   composes: icon-button;
//   color: theme-color;
// }

// .icon-button:hover {
//   color: font-color-secondary;
// }

const OuterButton = styled.button`
  color: ${props => props.active ? THEME_COLOR : FONT_COLOR_SECONDARY};
  padding: 4px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;

  &:hover {
    color: ${FONT_COLOR_PRIMARY}
  }
`;

// {/*<button
//       className={active ? styles.iconButtonActive : styles.iconButton}
//       title={title}
//       onClick={onClick}
//     >
//       <FontAwesome name={name} />
//     </button>*/}

function FontAwesomeButton({ title, name, active, onClick }) {
  return (
    <OuterButton title={title} onClick={onClick}>
      <FontAwesome name={name} />
    </OuterButton>
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
