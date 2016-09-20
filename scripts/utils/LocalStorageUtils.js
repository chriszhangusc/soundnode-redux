export const setLastVolume = (volume) => {
  localStorage.setItem('lastVolume', JSON.stringify(volume));
}

export const getLastVolume = () => {
  return JSON.parse(localStorage.getItem('lastVolume'));
}

export const loadState = () => {
  try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
  } catch (err) {
      return undefined; // Return undefined so that our reducer initialize with default state.
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
