// TODO: Group with normalizr?

import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');

export const commentSchema = new schema.Entity('comments', {
  user: userSchema,
});

export const trackSchema = new schema.Entity('tracks', {
  user: userSchema,
});

export const playlistSchema = new schema.Entity('playlists');

export const trackArraySchema = new schema.Array(trackSchema);
export const userArraySchema = new schema.Array(userSchema);
export const commentArraySchema = new schema.Array(commentSchema);
export const playlistArraySchema = new schema.Array(playlistSchema);

playlistSchema.define({
  user: userSchema,
  tracks: trackArraySchema,
});
