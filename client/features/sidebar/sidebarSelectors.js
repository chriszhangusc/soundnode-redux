import { createSelector } from 'reselect';

const getSidebarState = state => state.sidebar;

// eslint-disable-next-line
export const isSidebarHidden = createSelector(getSidebarState, sidebarState => sidebarState.hidden);
