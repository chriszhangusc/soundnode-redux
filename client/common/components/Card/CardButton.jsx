import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import styled from 'styled-components';
import { FONT_COLOR_PRIMARY, FONT_COLOR_SECONDARY, THEME_COLOR } from 'app/css/colors';

const Wrapper = styled.span`
  padding: 4px;
  cursor: pointer;
  text-align: center;
  margin-right: 20px;
`;

function CardButton({ title, name, active, onClick, tooltipText }) {
  return (
    <Wrapper>
      <Icon
        name={name}
        active={active}
        title={title}
        color={FONT_COLOR_SECONDARY}
        hoverColor={FONT_COLOR_PRIMARY}
        activeColor={THEME_COLOR}
        onClick={onClick}
        tooltipText={tooltipText}
        tooltipPlacement="bottom"
      />
    </Wrapper>
  );
}

CardButton.defaultProps = {
  active: false,
  tooltipText: '',
  title: '',
};

CardButton.propTypes = {
  active: PropTypes.bool,
  title: PropTypes.string,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default CardButton;
