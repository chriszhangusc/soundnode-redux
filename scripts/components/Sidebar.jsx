import React from 'react';
import { Link } from 'react-router';

const Sidebar = () => (
  <ul className="nav-sidebar">
    <li>
      <Link
        to="/"
        activeClassName="sidebar-link-active"
      >Top 50</Link>
    </li>
    <li>
      <a href="#">Likes</a>
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

export default Sidebar;
