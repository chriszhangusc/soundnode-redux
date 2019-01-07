import { createSelector } from 'reselect';

export const getState = state => state.notification;
export const getNotifications = createSelector(getState, state => state.notifications);
