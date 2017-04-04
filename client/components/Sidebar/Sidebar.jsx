import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar-wrapper">
    <ul className="nav-sidebar">
      <li>
        <NavLink
          to="/charts"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-trophy" /><span>Top 50</span></NavLink>
      </li>
      <li>
        <NavLink
          to="/likes"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-heart" />Likes</NavLink>
      </li>
      <li>
        <NavLink
          to="/playlists"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-list" />Playlists</NavLink>
      </li>
      <li>
        <NavLink
          to="/tracks"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-music" />Tracks</NavLink>
      </li>
      <li>
        <NavLink
          to="/stream"
          activeClassName="sidebar-link-active"
        ><i className="fa fa-cloud" />Stream</NavLink>
      </li>
    </ul>
  </div>
);

export default Sidebar;
