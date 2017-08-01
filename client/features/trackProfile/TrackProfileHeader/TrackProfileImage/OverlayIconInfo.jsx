import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';

function OverlayIconInfo({ iconName, iconActive, info }) {
  return (
    <span>
      <Icon name={iconName} active={iconActive} />
      {info}
    </span>
  );
}

OverlayIconInfo.defaultProps = {
  iconActive: false,
  info: '',
};

OverlayIconInfo.propTypes = {
  iconName: PropTypes.string.isRequired,
  iconActive: PropTypes.bool,
  info: PropTypes.string,
};

export default OverlayIconInfo;
