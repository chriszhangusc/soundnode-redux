import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Icon from 'common/components/icons/Icon';
import * as actions from '../sidebarActions';
import { getSelectedTab } from '../sidebarSelectors';
import SidebarNavLink from './SidebarNavLink';

const ListItem = styled.li`line-height: 80px;`;

const Title = styled.span``;

const SidebarContent = styled.div`text-align: center;`;

function SidebarTab({ selectedTab, toggleSidebar, selectTab, to, iconName, title }) {
  const handleTabClick = () => {
    selectTab(title);
    toggleSidebar();
  };

  return (
    <ListItem>
      <SidebarNavLink to={to} selected={selectedTab === title} onClick={handleTabClick}>
        <SidebarContent>
          <Icon iconName={iconName} mr="5px" />
          <Title>
            {title}
          </Title>
        </SidebarContent>
      </SidebarNavLink>
    </ListItem>
  );
}

function mapStateToProps(state) {
  return {
    selectedTab: getSelectedTab(state),
  };
}

const Connected = connect(mapStateToProps, actions)(SidebarTab);

const propTypes = {
  to: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const injectedProps = {
  selectedTab: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  selectTab: PropTypes.func.isRequired,
};

// connect() will map pass through props as-is
SidebarTab.propTypes = {
  ...propTypes,
  ...injectedProps,
};
Connected.propTypes = propTypes;

export default Connected;
