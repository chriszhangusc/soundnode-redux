import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY } from 'client/app/css/colors';

const WrapperButton = styled.button`
  color: ${props => props.activeColor || props.color || FONT_COLOR_PRIMARY};
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

function IconButton(props) {
  const { iconClassName } = props;

  return (
    <WrapperButton {...props}>
      <i className={iconClassName} />
    </WrapperButton>
  );
}

IconButton.defaultProps = {
  title: '',
  color: '',
  hoverColor: '',
  activeColor: '',
};

IconButton.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
};

export default IconButton;
