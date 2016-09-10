import { Schema, arrayOf } from 'normalizr';
// Why song - songs??
export const song = new Schema('songs');
export const arrayOfSongs = arrayOf(song);
