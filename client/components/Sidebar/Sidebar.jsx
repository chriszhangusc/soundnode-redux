import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => (
  <div className="sidebar-wrapper">
    <ul className="nav-sidebar">
      <li>
        <Link
          to="/charts"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-trophy" /><span>Top 50</span></Link>
      </li>
      <li>
        <Link
          to="/likes"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-heart" />Likes</Link>
      </li>
      <li>
        <Link
          to="/playlists"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-list" />Playlists</Link>
      </li>
      <li>
        <Link
          to="/tracks"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-music" />Tracks</Link>
      </li>
      <li>
        <Link
          to="/stream"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-cloud" />Stream</Link>
      </li>
    </ul>
  </div>
);

export default Sidebar;
