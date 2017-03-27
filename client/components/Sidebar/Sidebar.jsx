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
                    <a href="#"><i className="fa fa-list"></i>Playlists</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-music"></i>Tracks</a>
                </li>
                <li>
                    <a href="#"><i className="fa fa-cloud"></i>Stream</a>
                </li>
            </ul>
        </div>
    );
}
export default Sidebar;
