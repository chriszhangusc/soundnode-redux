import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from '../sidebarActions';
import { getSelectedTab } from '../sidebarSelectors';
import SidebarNavLink from './SidebarNavLink';
import SidebarTabIcon from './SidebarTabIcon';

const ListItem = styled.li`line-height: 80px;`;

const Title = styled.span``;

function SidebarTab({ selectedTab, toggleSidebar, selectTab, to, iconClassName, title }) {
  return (
    <ListItem>
      <SidebarNavLink
        to={to}
        selected={selectedTab === title}
        onClick={() => {
          selectTab(title);
          toggleSidebar();
        }}
      >
        <SidebarTabIcon className={iconClassName} />
        <Title>
          {title}
        </Title>
      </SidebarNavLink>
    </ListItem>
  );
}

SidebarTab.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  selectTab: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    selectedTab: getSelectedTab(state),
  };
}

export default connect(mapStateToProps, actions)(SidebarTab);
