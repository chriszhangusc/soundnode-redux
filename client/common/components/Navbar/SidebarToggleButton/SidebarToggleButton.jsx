import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'common/components/buttons/IconButton';
import { white } from 'app/css/colors';
import { connect } from 'react-redux';
import * as sidebarActions from 'features/sidebar/sidebarActions';
import Wrapper from './Wrapper';

function SidebarToggleButton({ toggleSidebar }) {
  const handleToggleSidebar = () => {
    toggleSidebar();
  };

  return (
    <Wrapper>
      <IconButton iconSize="1.5rem" color={white} iconName="bars" onClick={handleToggleSidebar} />
    </Wrapper>
  );
}

SidebarToggleButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default connect(null, sidebarActions)(SidebarToggleButton);
