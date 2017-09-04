import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import styled from 'styled-components';
import { fontColor, fontColorSub, themeColor } from 'app/css/colors';

const Wrapper = styled.span`
  text-align: center;
  margin-right: 20px;
`;

function CardButton({ title, iconName, active, onClick, tooltipText }) {
  return (
    <Wrapper>
      <IconButton
        iconName={iconName}
        active={active}
        title={title}
        color={fontColorSub}
        hoverColor={fontColor}
        activeColor={themeColor}
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
  iconName: PropTypes.string.isRequired,
};

export default CardButton;
