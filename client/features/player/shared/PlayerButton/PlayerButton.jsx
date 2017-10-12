import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import { themeColor, fontColor } from 'app/css/colors';

function PlayerButton({ active, disabled, ...rest }) {
  return (
    <IconButton
      iconSize="lg"
      hoverColor={themeColor}
      color={fontColor}
      active={active}
      activeColor={themeColor}
      disabled={disabled}
      {...rest}
    />
  );
}

PlayerButton.defaultProps = {
  active: false,
};

PlayerButton.propTypes = {
  active: PropTypes.bool,
};

export default PlayerButton;
