import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { media } from 'client/css/style-utils';
import {
  SIDEBAR_WIDTH_DESKTOP,
  SIDEBAR_WIDTH_DESKTOP_LG,
  SIDEBAR_WIDTH_4K,
  SIDEBAR_ITEM_HEIGHT,
} from 'client/css/variables';
import { FONT_COLOR_PRIMARY, LIGHT_BLACK, GRAY } from 'client/css/colors';
import styles from './Sidebar.css';

const SidebarWrapper = styled.div`
  position: fixed;
  height: 100%;
  background-color: ${LIGHT_BLACK};
  ${media.desktop`width: ${SIDEBAR_WIDTH_DESKTOP}`}
  ${media.desktopLG`width: ${SIDEBAR_WIDTH_DESKTOP_LG}`}
  ${media.desktop4K`width: ${SIDEBAR_WIDTH_4K}`}
`;

const NavSidebar = styled.ul`
  > li {
    line-height: ${SIDEBAR_ITEM_HEIGHT};
  }

  i {
    font-size: 1rem;
    margin-right: 10px;
  }

  > li > a {
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

// Should be refactored to take sidebar items as props
function Sidebar() {
  // The activeClassName thing would need work-around to work with styled-component: https://github.com/styled-components/styled-components/issues/184
  return (
    <SidebarWrapper>
      <NavSidebar>
        <li>
          <NavLink to="/charts" activeClassName={styles.sidebarLinkActive}>
            <i className="fa fa-trophy" /><span>Top 50</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/likes" activeClassName={styles.sidebarLinkActive}>
            <i className="fa fa-heart" />Likes
          </NavLink>
        </li>
        <li>
          <NavLink to="/playlists" activeClassName={styles.sidebarLinkActive}>
            <i className="fa fa-list" />Playlists
          </NavLink>
        </li>
        <li>
          <NavLink to="/tracks" activeClassName={styles.sidebarLinkActive}>
            <i className="fa fa-music" />Tracks
          </NavLink>
        </li>
        <li>
          <NavLink to="/stream" activeClassName={styles.sidebarLinkActive}>
            <i className="fa fa-cloud" />Stream
          </NavLink>
        </li>
      </NavSidebar>
    </SidebarWrapper>
  );
}

export default Sidebar;
