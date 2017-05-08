import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SIDEBAR_ITEM_HEIGHT } from 'client/app/css/variables';
import { FONT_COLOR_PRIMARY, GRAY } from 'client/app/css/colors';
import styles from './Sidebar.css';

const ListItem = styled.li`
  line-height: ${SIDEBAR_ITEM_HEIGHT};

  > a {
    font-size: 1.1rem;
    padding-right: 20px;
    padding-left: 20px;
    display: block;
    text-align: center;
    color: ${FONT_COLOR_PRIMARY};
    transition: color 0.25s ease-out;
    &:hover, &:focus, &:active {
      text-decoration: none;
      color: ${GRAY};
    }
  }
`;

const Icon = styled.i`
  font-size: 1rem;
  margin-right: 10px;
`;

function SidebarItem({ to, iconClassName, title }) {
  return (
    <ListItem>
      <NavLink to={to} activeClassName={styles.sidebarLinkActive}>
        <Icon className={iconClassName} /><span>{title}</span>
      </NavLink>
    </ListItem>
  );
}

SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  iconClassName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SidebarItem;
