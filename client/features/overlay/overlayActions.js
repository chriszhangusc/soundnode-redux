import { OVERLAY_SHOW, OVERLAY_HIDE } from 'features/overlay/overlayActionTypes';
import { hideSidebar } from 'features/sidebar/sidebarActions';
import { hideModal } from 'features/modals/modalsActions';

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
    } else if (state.overlay.for === 'MODAL') {
      dispatch(hideModal());
    }
    dispatch({
      type: OVERLAY_HIDE,
    });
  };
}
