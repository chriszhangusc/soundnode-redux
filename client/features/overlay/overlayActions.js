import { OVERLAY_SHOW, OVERLAY_HIDE } from 'features/overlay/overlayActionTypes';
import { hideSidebar } from 'features/sidebar/sidebarActions';

export function showOverlay() {
  return {
    type: OVERLAY_SHOW,
  };
}

export function hideOverlay() {
  return (dispatch, getState) => {
    const state = getState();
    if (state.overlay.for === 'SIDEBAR') {
      dispatch(hideSidebar());
    }
    dispatch({
      type: OVERLAY_HIDE,
    });
  };
}
