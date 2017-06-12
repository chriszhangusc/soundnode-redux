import React from 'react';
import styled from 'styled-components';

import {
  SIDEBAR_WIDTH_DESKTOP,
  SIDEBAR_WIDTH_DESKTOP_LG,
  SIDEBAR_WIDTH_4K,
} from 'client/app/css/variables';
import * as routes from 'client/common/constants/routeConsts';
import { media } from 'client/app/css/styleUtils';
import { LIGHT_BLACK } from 'client/app/css/colors';

import SidebarItem from './SidebarItem';

const SidebarWrapper = styled.div`
  position: fixed;
  height: 100%;
  background-color: ${LIGHT_BLACK};
  ${media.desktop`width: ${SIDEBAR_WIDTH_DESKTOP}`}
  ${media.desktopLG`width: ${SIDEBAR_WIDTH_DESKTOP_LG}`}
  ${media.desktop4K`width: ${SIDEBAR_WIDTH_4K}`}
`;

const SIDEBAR_ITEM_LIST = [
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
    to: '/playlists',
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
        {SIDEBAR_ITEM_LIST.map(d => <SidebarItem {...d} key={d.title} />)}
      </ul>
    </SidebarWrapper>
  );
}

export default Sidebar;
