import { fromJS } from 'immutable';

export const setLastVolume = (volume) => {
  localStorage.setItem('lastVolume', JSON.stringify(volume));
};

export const getLastVolume = () => JSON.parse(localStorage.getItem('lastVolume'));

// Currently we are persisting everything in the store, will change this to improve preformance.
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) return undefined;

    return fromJS(JSON.parse(serializedState));
  } catch (err) {
    console.log('Load State Error: ', err);
    return undefined; // Return undefined so that our reducer initialize with default state.
  }
};

// Only store player state and auth state, no fetched playlists
export const saveState = (state, keys) => {
  try {
    // For playlists, we only want to store playerPlaylist
    let sliceOfState = fromJS({});
    keys.forEach((key) => {
      const keyPath = key.split('/');
      sliceOfState = sliceOfState.setIn(keyPath, state.getIn(keyPath));
    });
    const serializedState = JSON.stringify(sliceOfState.toJS());
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log('Save State Error', err);
  }
};
