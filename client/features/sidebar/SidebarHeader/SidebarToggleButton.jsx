import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import { white } from 'app/css/colors';
import { connect } from 'react-redux';
import * as sidebarActions from 'features/sidebar/sidebarActions';

function SidebarToggleButton({ toggleSidebar }) {
  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <IconButton
      iconSize="lg"
      color={white}
      iconName="bars"
      mr="10px"
      onClick={handleToggleSidebar}
    />
  );
}

SidebarToggleButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default connect(null, sidebarActions)(SidebarToggleButton);
