import { createSelector } from 'reselect';

const getSidebarState = state => state.sidebar;

export const getSelectedTab = createSelector(
  getSidebarState,
  sidebarState => sidebarState.selectedTab,
);

