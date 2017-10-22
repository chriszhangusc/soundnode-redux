import { OVERLAY_SHOW, OVERLAY_HIDE } from 'features/overlay/overlayActionTypes';
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from 'features/sidebar/sidebarActionTypes';
import { MODAL_SHOW, MODAL_HIDE } from 'features/modals/modalsActionTypes';

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
    case MODAL_SHOW:
      return {
        isActive: true,
        for: 'MODAL',
      };

    case SIDEBAR_SHOW:
      return {
        isActive: true,
        for: 'SIDEBAR',
      };

    case OVERLAY_SHOW:
      return showOverlay(state);

    case MODAL_HIDE:
    case SIDEBAR_HIDE:
    case OVERLAY_HIDE:
      return hideOverlay(state);

    default:
      return state;
  }
}
