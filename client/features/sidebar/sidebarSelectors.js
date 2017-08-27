import { createSelector } from 'reselect';

const getSidebarState = state => state.sidebar;

export const getSelectedTab = createSelector(
  getSidebarState,
  sidebarState => sidebarState.selectedTab,
);

export const isSidebarHidden = createSelector(getSidebarState, sidebarState => sidebarState.hidden);
