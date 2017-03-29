import React from 'react';
import { Link, IndexLink } from 'react-router';

const Sidebar = () => {
    return (
        <div id="sidebar-wrapper">
            <ul className="nav-sidebar">
                <li>
                    <Link
                      to="/charts"
                      activeClassName="sidebar-link-active"
                    ><i className="fa fa-trophy"></i><span>Top 50</span></Link>
                </li>
                <li>
                    <Link
                      to="/likes"
                      activeClassName="sidebar-link-active"
                    ><i className="fa fa-heart"></i>Likes</Link>
                </li>
                <li>
                    <Link
                      to="/playlists"
                      activeClassName="sidebar-link-active"
                    ><i className="fa fa-list"></i>Playlists</Link>
                </li>
                <li>
                    <Link
                      to="/tracks"
                      activeClassName="sidebar-link-active"
                    ><i className="fa fa-music"></i>Tracks</Link>
                </li>
                <li>
                    <Link
                      to="/stream"
                      activeClassName="sidebar-link-active"
                    ><i className="fa fa-cloud"></i>Stream</Link>
                </li>
            </ul>
        </div>
    );
}
export default Sidebar;
