import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';

// Figure out a way to specify iconSize!!

// Filter props to get rid of unknown props warning:
// https://github.com/styled-components/styled-components/issues/305
const StyledIcon = styled(
  ({ color, hoverColor, active, inverted, activeColor, iconSize, small, ...rest }) =>
    <FontAwesome {...rest} />,
).attrs({
  color: props => props.color || props.theme.colors.fontColor,
  activeColor: props => props.activeColor || props.theme.colors.themeColor,
  hoverColor: props => props.hoverColor || props.color,
  // iconSize: props => props.iconSize || '1rem',
  iconSize: props => (props.small ? '0.75rem' : props.iconSize),
})`
  margin-right: 5px;
  color: ${props => (props.active ? props.activeColor : props.color)};
  font-size: ${props => props.iconSize || '1rem'};
  &:hover {
    color: ${props => props.hoverColor};
  }
`;

function Icon(props) {
  const { tooltipDelayShow, tooltipDelayHide, tooltipPlacement, tooltipText, ...rest } = props;

  const tooltip = (
    <Tooltip id={`tooltip-${shortid.generate()}`}>
      {tooltipText}
    </Tooltip>
  );

  return tooltipText
    ? <OverlayTrigger
      delayShow={tooltipDelayShow}
      delayHide={tooltipDelayHide}
      placement={tooltipPlacement}
      overlay={tooltip}
    >
      <StyledIcon {...rest} />
    </OverlayTrigger>
    : <StyledIcon {...rest} />;
}

Icon.defaultProps = {
  tooltipDelayHide: 200,
  tooltipDelayShow: 1000,
  tooltipPlacement: 'top',
  tooltipText: '',
};

Icon.propTypes = {
  tooltipDelayHide: PropTypes.number,
  tooltipDelayShow: PropTypes.number,
  tooltipPlacement: PropTypes.string,
  tooltipText: PropTypes.string,
};

export default Icon;
