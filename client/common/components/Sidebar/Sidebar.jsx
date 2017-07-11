import React from 'react';
import styled from 'styled-components';
import * as routes from 'common/constants/routeConsts';
import { LIGHT_BLACK } from 'app/css/colors';

import SidebarItem from './SidebarItem';

const SidebarWrapper = styled.nav`
  position: fixed;
  width: 300px;
  height: 100%;
  background-color: ${LIGHT_BLACK};
  z-index: 1;
`;

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
    <SidebarWrapper>
      <ul>
        {sidebarItemList.map(d => <SidebarItem {...d} key={d.title} />)}
      </ul>
    </SidebarWrapper>
  );
}

export default Sidebar;
