import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'client/common/components/Buttons/IconButton';
import styled from 'styled-components';
import { THEME_COLOR, WHITE } from 'client/app/css/colors';

const Wrapper = styled.div`
  font-size: 1rem;
  margin-left: 20px;
`;

function PlayerButton(props) {
  return (
    <Wrapper>
      <IconButton hoverColor={THEME_COLOR} color={WHITE} activeColor={props.active ? THEME_COLOR : ''} {...props} />
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
