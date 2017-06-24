import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY } from 'app/css/colors';
import shortid from 'shortid';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

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

function IconButton({
  tooltipText,
  tooltipPlacement,
  tooltipDelayShow,
  tooltipDelayHide,
  iconClassName,
  ...rest
}) {
  const tooltip = <Tooltip id={`tooltip-${shortid.generate()}`}>{tooltipText}</Tooltip>;
  return (
    <OverlayTrigger
      placement={tooltipPlacement}
      delayShow={tooltipDelayShow}
      delayHide={tooltipDelayHide}
      overlay={tooltip}
    >
      <WrapperButton {...rest}>
        <i className={iconClassName} />
      </WrapperButton>
    </OverlayTrigger>
  );
}

IconButton.defaultProps = {
  title: '',
  color: '',
  hoverColor: '',
  activeColor: '',
  tooltipText: '',
  tooltipPlacement: 'top',
  tooltipDelayHide: 200,
  tooltipDelayShow: 1000,
};

IconButton.propTypes = {
  tooltipText: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  iconClassName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  hoverColor: PropTypes.string,
  activeColor: PropTypes.string,
  tooltipDelayShow: PropTypes.number,
  tooltipDelayHide: PropTypes.number,
};

export default IconButton;
