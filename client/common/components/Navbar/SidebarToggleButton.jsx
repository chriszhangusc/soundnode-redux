import React from 'react';
import Icon from 'common/components/icons/Icon';
import { white } from 'app/css/colors';
import { connect } from 'react-redux';
import * as sidebarActions from 'common/components/Sidebar/sidebarActions';

function SidebarToggleButton({ toggleSidebar, ...rest }) {
  return (
    <Icon
      iconSize="2rem"
      color={white}
      name="bars"
      onClick={() => {
        console.log('Should call toggle sidebar');
        toggleSidebar();
      }}
      {...rest}
    />
  );
}

export default connect(null, sidebarActions)(SidebarToggleButton);
