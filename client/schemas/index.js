import { Schema, arrayOf } from 'normalizr';

export const artistSchema = new Schema('artists');
export const commentSchema = new Schema('comments');
export const trackSchema = new Schema('tracks');

// Removing it because the user information sent back along with tracks is not intact.
trackSchema.define({
  user: artistSchema,
});

// Same reason as above
commentSchema.define({
  user: artistSchema,
});

export const trackArraySchema = arrayOf(trackSchema);
export const artistArraySchema = arrayOf(artistSchema);
export const commentArraySchema = arrayOf(commentSchema);
// const Schemas = {
//   artistSchema,
//   trackSchema,
//   commentSchema,
//   trackArraySchema
// };
//
// export default Schemas;
