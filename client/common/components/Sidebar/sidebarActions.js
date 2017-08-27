import { SIDEBAR_TOGGLE, SIDEBAR_TAB_SELECT } from './sidebarActionTypes';

export function toggleSidebar() {
  return {
    type: SIDEBAR_TOGGLE,
  };
}

export function selectTab(tabName) {
  return {
    type: SIDEBAR_TAB_SELECT,
    payload: {
      tabName,
    },
  };
}
