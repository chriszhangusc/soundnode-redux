import { LOADING_OVERLAY_HIDE, LOADING_OVERLAY_SHOW } from './loadingOverlayActionTypes';

export function showLoadingOverlay(text) {
  return {
    type: LOADING_OVERLAY_SHOW,
    payload: {
      text,
    },
  };
}

export function hideLoadingOverlay() {
  return {
    type: LOADING_OVERLAY_HIDE,
  };
}
