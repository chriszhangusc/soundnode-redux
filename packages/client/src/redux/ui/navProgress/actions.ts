import { NAV_PROGRESS_LOADER_START, NAV_PROGRESS_LOADER_STOP } from './actionTypes';

export function startNavProgressLoader() {
  return {
    type: NAV_PROGRESS_LOADER_START,
  };
}

export function stopNavProgressLoader() {
  return {
    type: NAV_PROGRESS_LOADER_STOP,
  };
}
