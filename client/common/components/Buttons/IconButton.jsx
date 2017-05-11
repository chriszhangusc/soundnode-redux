import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const WrapperButton = styled.button`
  color: ${props => props.color || FONT_COLOR_PRIMARY};
  padding: 4px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
  &:hover {
    color: ${props => props.hoverColor || FONT_COLOR_SECONDARY};
  }
`;

function IconButton({ title, btnClassName, iconClassName, onClick, color, large, hoverColor }) {
  return (
    <WrapperButton
      title={title}
      className={`${btnClassName}`}
      onClick={onClick}
      color={color}
      hoverColor={hoverColor}
    >
      {iconClassName && <i className={iconClassName} />}
    </WrapperButton>
  );
}

IconButton.defaultProps = {
  btnClassName: '',
  title: '',
};

IconButton.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string.isRequired,
  btnClassName: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
