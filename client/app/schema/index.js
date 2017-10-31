// TODO: Group with normalizr?

import { Schema, arrayOf } from 'normalizr';

export const userSchema = new Schema('users');
export const commentSchema = new Schema('comments');
export const trackSchema = new Schema('tracks');
export const playlistSchema = new Schema('playlists');

export const trackArraySchema = arrayOf(trackSchema);
export const userArraySchema = arrayOf(userSchema);
export const commentArraySchema = arrayOf(commentSchema);
export const playlistArraySchema = arrayOf(playlistSchema);

trackSchema.define({
  user: userSchema,
});

// Same reason as above
commentSchema.define({
  user: userSchema,
});

playlistSchema.define({
  user: userSchema,
  tracks: trackArraySchema,
});
