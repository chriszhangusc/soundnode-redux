import { createReducer } from 'common/utils/reducerUtils';
import { OVERLAY_SHOW, OVERLAY_HIDE } from 'features/overlay/overlayActionTypes';
import { SIDEBAR_SHOW, SIDEBAR_HIDE } from 'features/sidebar/sidebarActionTypes';
import { MODAL_SHOW, MODAL_HIDE } from 'features/modals/root/rootModalActionTypes';
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

function showOverlayForModal() {
  return {
    active: true,
    for: 'MODAL',
  };
}

export function showOverlayForSidebar() {
  return {
    active: true,
    for: 'SIDEBAR',
  };
}

export function showOverlayForLoading() {
  return {
    active: true,
    for: 'LOADING_OVERLAY',
  };
}

export default createReducer(initialState, {
  [OVERLAY_SHOW]: showOverlay,
  [OVERLAY_HIDE]: hideOverlay,

  // Should we do it here(implicit) or with actions(explicit)
  [MODAL_SHOW]: showOverlayForModal,
  [MODAL_HIDE]: hideOverlay,

  [SIDEBAR_SHOW]: showOverlayForSidebar,
  [SIDEBAR_HIDE]: hideOverlay,

  [LOADING_OVERLAY_SHOW]: showOverlayForLoading,
  [LOADING_OVERLAY_HIDE]: hideOverlay,
});
