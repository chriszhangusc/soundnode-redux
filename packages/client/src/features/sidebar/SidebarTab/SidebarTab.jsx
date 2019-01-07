import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@soundnode-redux/client/src/common/components/icons/Icon';
import SidebarNavLink from './SidebarNavLink';

function SidebarTab({ to, iconName, title, onClick }) {
  return (
    <SidebarNavLink to={to} onClick={onClick}>
      <Icon iconName={iconName} iconSize="lg" mr="10px" ml="90px" />
      {title}
    </SidebarNavLink>
  );
}

SidebarTab.defaultProps = {
  onClick: null,
};

SidebarTab.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarTab;
