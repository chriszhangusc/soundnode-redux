import { LOADING_OVERLAY_SHOW, LOADING_OVERLAY_HIDE } from './globalOverlayLoaderActionTypes';

const initialState = {
  active: false,
  text: '',
};

function showLoadingOverlay(state, { text }) {
  return {
    ...state,
    active: true,
    text,
  };
}

function hideLoadingOverlay(state) {
  return {
    ...state,
    active: false,
    text: '',
  };
}

export default function globalOverlayLoaderReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_OVERLAY_SHOW:
      return showLoadingOverlay(state, action.payload);
    case LOADING_OVERLAY_HIDE:
      return hideLoadingOverlay(state);
    default:
      return state;
  }
}
