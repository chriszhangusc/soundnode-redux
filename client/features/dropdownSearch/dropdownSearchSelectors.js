/* Selectors */
export const getDropdownSearchState = state => state.dropdownSearch;
export const isDropdownSearching = state => getDropdownSearchState(state).dropdownFetching;
export const isDropdownShown = state => getDropdownSearchState(state).dropdownShown;
export const getDropdownSearchArtistIds = state => getDropdownSearchState(state).dropdownArtistIds;
export const getDropdownSearchTrackIds = state => getDropdownSearchState(state).dropdownTrackIds;
