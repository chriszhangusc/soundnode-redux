import { OVERLAY_LOADER_DEACTIVATE, OVERLAY_LOADER_ACTIVATE } from './overlayLoaderActionTypes';

export function activateOverlayLoader(text) {
  return {
    type: OVERLAY_LOADER_ACTIVATE,
    payload: {
      text,
    },
  };
}

export function deactivateOverlayLoader() {
  return {
    type: OVERLAY_LOADER_DEACTIVATE,
  };
}
