import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import styled from 'styled-components';
import { THEME_COLOR, WHITE } from 'app/css/colors';

const Wrapper = styled.div`
  font-size: 1.3rem;
  margin-left: 20px;
  cursor: pointer;
`;

function PlayerButton({ active, ...rest }) {
  return (
    <Wrapper>
      <Icon
        hoverColor={THEME_COLOR}
        color={WHITE}
        activeColor={active ? THEME_COLOR : ''}
        {...rest}
      />
    </Wrapper>
  );
}

PlayerButton.defaultProps = {
  active: false,
};

PlayerButton.propTypes = {
  active: PropTypes.bool,
};

export default PlayerButton;
