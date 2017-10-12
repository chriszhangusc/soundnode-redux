import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';
import Wrapper from './Wrapper';

function IconButton({
  onClick,
  tooltipDelayShow,
  tooltipDelayHide,
  tooltipPlacement,
  tooltipText,
  disabled,
  ...iconProps
}) {
  const tooltip = <Tooltip id={`tooltip-${shortid.generate()}`}>{tooltipText}</Tooltip>;
  const iconButton = (
    <Wrapper onClick={onClick} disabled={disabled}>
      <Icon {...iconProps} disabled={disabled} />
    </Wrapper>
  );

  return tooltipText ? (
    <OverlayTrigger
      delayShow={tooltipDelayShow}
      delayHide={tooltipDelayHide}
      placement={tooltipPlacement}
      overlay={tooltip}
    >
      {iconButton}
    </OverlayTrigger>
  ) : (
    iconButton
  );
}

IconButton.defaultProps = {
  tooltipText: '',
  tooltipPlacement: 'top',
  tooltipDelayHide: 200,
  tooltipDelayShow: 1000,
};

IconButton.propTypes = {
  tooltipDelayShow: PropTypes.number,
  tooltipDelayHide: PropTypes.number,
  tooltipText: PropTypes.string,
  tooltipPlacement: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
