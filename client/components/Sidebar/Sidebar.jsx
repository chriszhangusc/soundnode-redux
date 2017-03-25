import React from 'react';
import { Link, IndexLink } from 'react-router';
import styles from './sidebar.scss';

const Sidebar = () => {
    console.log(styles);
    return (
        <ul className="nav-sidebar">
          <li>
            <Link
              to="/charts"
              activeClassName="sidebar-link-active"
            >Top 50</Link>
          </li>
          <li>
            <Link
              to="/likes"
              activeClassName="sidebar-link-active"
            >Likes</Link>
          </li>
          <li>
            <a href="#">Stream</a>
          </li>
          <li>
            <a href="#">Tracks</a>
          </li>
          <li>
            <a href="#">Playlists</a>
          </li>
        </ul>
    );
}
export default Sidebar;
