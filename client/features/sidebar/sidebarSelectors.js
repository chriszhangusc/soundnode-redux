import { createSelector } from 'reselect';

const getSidebarState = state => state.sidebar;

export const isSidebarHidden = createSelector(getSidebarState, sidebarState => sidebarState.hidden);
