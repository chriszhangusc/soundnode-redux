import { SIDEBAR_TOGGLE, SIDEBAR_SHOW, SIDEBAR_HIDE } from './sidebarActionTypes';

export function toggleSidebar() {
  return {
    type: SIDEBAR_TOGGLE,
  };
}

export function showSidebar() {
  return {
    type: SIDEBAR_SHOW,
  };
}

export function hideSidebar() {
  return {
    type: SIDEBAR_HIDE,
  };
}
