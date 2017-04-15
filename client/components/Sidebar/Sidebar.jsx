import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.css';

// Should be refactored to take sidebar items as props
function Sidebar() {
  return (
    <div className={styles.sidebarWrapper}>
      <ul className={styles.navSidebar}>
        <li>
          <NavLink
            to="/charts"
            activeClassName={styles.sidebarLinkActive}
          ><i className="fa fa-trophy" /><span>Top 50</span></NavLink>
        </li>
        <li>
          <NavLink
            to="/likes"
            activeClassName={styles.sidebarLinkActive}
          ><i className="fa fa-heart" />Likes</NavLink>
        </li>
        <li>
          <NavLink
            to="/playlists"
            activeClassName={styles.sidebarLinkActive}
          ><i className="fa fa-list" />Playlists</NavLink>
        </li>
        <li>
          <NavLink
            to="/tracks"
            activeClassName={styles.sidebarLinkActive}
          ><i className="fa fa-music" />Tracks</NavLink>
        </li>
        <li>
          <NavLink
            to="/stream"
            activeClassName={styles.sidebarLinkActive}
          ><i className="fa fa-cloud" />Stream</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
