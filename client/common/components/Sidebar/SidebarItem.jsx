import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as actions from './sidebarActions';
import SidebarNavLink from './SidebarNavLink';

const ListItem = styled.li`line-height: 80px;`;

const Icon = styled.i`
  font-size: 1rem;
  margin-right: 10px;
  width: 40%;
  text-align: right;
`;

const Title = styled.span``;

function SidebarItem({ selectedTab, toggleSidebar, selectTab, to, iconClassName, title }) {
  return (
    <ListItem>
      <SidebarNavLink
        to={to}
        active={selectedTab === title}
        onClick={() => {
          selectTab(title);
          toggleSidebar();
        }}
      >
        <Icon className={iconClassName} />
        <Title>
          {title}
        </Title>
      </SidebarNavLink>
    </ListItem>
  );
}

SidebarItem.propTypes = {
  selectedTab: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  selectTab: PropTypes.func.isRequired,
  to: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    selectedTab: state.sidebar.selectedTab,
  };
}

export default connect(mapStateToProps, actions)(SidebarItem);
