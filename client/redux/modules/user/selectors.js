/* Selectors */
export const getUserState = state => state.user;
export const getUserId = state => getUserState(state).userId;
export const getUserTrackIds = state => getUserState(state).trackIds;
export const isUserFetching = state => getUserState(state).userFetching;
export const isUserTracksFetching = state => getUserState(state).tracksFetching;
export const getUserTracksNextHref = state => getUserState(state).tracksNextHref;
