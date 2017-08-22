import React from 'react';
import * as routes from 'common/constants/routeConsts';
import SidebarItem from './SidebarItem';
import Wrapper from './Wrapper';

const sidebarItemList = [
  {
    to: routes.CHARTS_ROUTE,
    iconClassName: 'fa fa-trophy',
    title: 'Top 50',
  },
  {
    to: routes.FAVORITES_ROUTE,
    iconClassName: 'fa fa-heart',
    title: 'Favorites',
  },
  {
    to: routes.PLAYLISTS_ROUTE,
    iconClassName: 'fa fa-list',
    title: 'Playlists',
  },
  {
    to: routes.STREAM_ROUTE,
    iconClassName: 'fa fa-music',
    title: 'Stream',
  },
];

// Should be refactored to take sidebar items as props
function Sidebar() {
  // The activeClassName thing would need work-around to work with styled-component: https://github.com/styled-components/styled-components/issues/184
  return (
    <Wrapper>
      <ul>
        {sidebarItemList.map(item => <SidebarItem {...item} key={item.title} />)}
      </ul>
    </Wrapper>
  );
}

export default Sidebar;
