import { Schema, arrayOf } from 'normalizr';
export const song = new Schema('songs');
export const arrayOfSongs = arrayOf(song);
