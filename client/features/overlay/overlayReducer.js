import { OVERLAY_SHOW, OVERLAY_HIDE } from 'features/overlay/overlayActionTypes';
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from 'features/sidebar/sidebarActionTypes';

const initialState = {
  isActive: false,
  for: null,
};

function showOverlay(state) {
  return {
    ...state,
    isActive: true,
  };
}

function hideOverlay(state) {
  return {
    ...state,
    isActive: false,
  };
}

export default function Overlay(state = initialState, action) {
  switch (action.type) {
    case SIDEBAR_SHOW:
      return {
        isActive: true,
        for: 'SIDEBAR',
      };
    case OVERLAY_SHOW:
      return showOverlay(state);
    case SIDEBAR_HIDE:
      return {
        isActive: false,
        for: null,
      };
    case OVERLAY_HIDE:
      return hideOverlay(state);
    default:
      return state;
  }
}
