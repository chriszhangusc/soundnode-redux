import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { fontColor, themeColor } from 'app/css/colors';

function FontAwesomeIcon({ iconName, color, hoverColor, active, activeColor, iconSize, ...rest }) {
  return <FontAwesome name={iconName} {...rest} />;
}

FontAwesomeIcon.defaultProps = {
  color: fontColor,
  activeColor: themeColor,
  hoverColor: fontColor,
  active: false,
  iconSize: '1rem',
};

FontAwesomeIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  active: PropTypes.bool,
  iconSize: PropTypes.string,
};

export default styled(FontAwesomeIcon)`
  color: ${props => (props.active ? props.activeColor : props.color)};
  font-size: ${props => props.iconSize};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;
