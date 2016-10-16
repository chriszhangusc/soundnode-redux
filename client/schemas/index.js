import { Schema, arrayOf } from 'normalizr';

export const artistSchema = new Schema('artists');
export const commentSchema = new Schema('comments');
export const trackSchema = new Schema('tracks');

trackSchema.define({
  user: artistSchema
});

export const trackArraySchema = arrayOf(trackSchema);

// const Schemas = {
//   artistSchema,
//   trackSchema,
//   commentSchema,
//   trackArraySchema
// };
//
// export default Schemas;
