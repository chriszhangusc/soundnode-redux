import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import SidebarNavLink from './SidebarNavLink';

function SidebarTab({ to, iconName, title }) {
  return (
    <SidebarNavLink to={to}>
      <Icon iconName={iconName} iconSize="lg" mr="10px" ml="90px" />
      {title}
    </SidebarNavLink>
  );
}

SidebarTab.propTypes = {
  to: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarTab;
