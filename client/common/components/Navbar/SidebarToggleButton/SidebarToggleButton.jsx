import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'common/components/icons/Icon';
import { white } from 'app/css/colors';
import { connect } from 'react-redux';
import * as sidebarActions from 'common/components/Sidebar/sidebarActions';
import Wrapper from './Wrapper';

function SidebarToggleButton({ toggleSidebar }) {
  return (
    <Wrapper>
      <Icon
        iconSize="1.5rem"
        color={white}
        name="bars"
        onClick={() => {
          toggleSidebar();
        }}
      />
    </Wrapper>
  );
}

SidebarToggleButton.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default connect(null, sidebarActions)(SidebarToggleButton);
