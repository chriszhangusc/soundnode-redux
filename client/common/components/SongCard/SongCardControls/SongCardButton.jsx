import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY, THEME_COLOR } from 'app/css/colors';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import shortid from 'shortid';

const OuterButton = styled.button`
  color: ${props => (props.active ? THEME_COLOR : FONT_COLOR_SECONDARY)};
  padding: 4px;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0 auto;
  text-align: center;
  margin-right: 20px;

  &:hover {
    color: ${FONT_COLOR_PRIMARY}
  }
`;

function SongCardButton({ title, name, active, onClick, tooltipText }) {
  const tooltip = <Tooltip id={`tooltip-${shortid.generate()}`}>{tooltipText}</Tooltip>;
  return (
    <OverlayTrigger delayShow={1000} delayHide={200} placement="bottom" overlay={tooltip}>
      <OuterButton active={active} title={title} onClick={onClick}>
        <FontAwesome name={name} />
      </OuterButton>
    </OverlayTrigger>
  );
}

SongCardButton.defaultProps = {
  active: false,
  tooltipText: '',
  title: '',
};

SongCardButton.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SongCardButton;
