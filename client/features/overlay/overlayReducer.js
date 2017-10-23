import { OVERLAY_SHOW, OVERLAY_HIDE } from 'features/overlay/overlayActionTypes';
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from 'features/sidebar/sidebarActionTypes';
import { MODAL_SHOW, MODAL_HIDE } from 'features/modals/modalsActionTypes';
import {
  LOADING_OVERLAY_SHOW,
  LOADING_OVERLAY_HIDE,
} from 'features/loadingOverlay/loadingOverlayActionTypes';

const initialState = {
  active: false,
  for: null,
};

function showOverlay(state) {
  return {
    ...state,
    active: true,
  };
}

function hideOverlay(state) {
  return {
    ...state,
    active: false,
  };
}

export default function Overlay(state = initialState, action) {
  switch (action.type) {
    case MODAL_SHOW:
      return {
        active: true,
        for: 'MODAL',
      };

    case SIDEBAR_SHOW:
      return {
        active: true,
        for: 'SIDEBAR',
      };

    case LOADING_OVERLAY_SHOW:
      return {
        active: true,
        for: 'LOADING_OVERLAY',
      };

    case OVERLAY_SHOW:
      return showOverlay(state);

    case LOADING_OVERLAY_HIDE:
    case MODAL_HIDE:
    case SIDEBAR_HIDE:
    case OVERLAY_HIDE:
      return hideOverlay(state);

    default:
      return state;
  }
}
