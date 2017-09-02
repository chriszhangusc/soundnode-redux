import { OVERLAY_LOADER_ACTIVATE, OVERLAY_LOADER_DEACTIVATE } from './globalOverlayLoaderActionTypes';

const initialState = {
  active: false,
  text: '',
};

function activateOverlayLoader(state, { text }) {
  return {
    ...state,
    active: true,
    text,
  };
}

function deactivateOverlayLoader(state) {
  return {
    ...state,
    active: false,
    text: '',
  };
}

export default function globalOverlayLoaderReducer(state = initialState, action) {
  switch (action.type) {
    case OVERLAY_LOADER_ACTIVATE:
      return activateOverlayLoader(state, action.payload);
    case OVERLAY_LOADER_DEACTIVATE:
      return deactivateOverlayLoader(state);
    default:
      return state;
  }
}
