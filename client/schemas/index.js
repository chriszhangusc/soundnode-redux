import { Schema, arrayOf } from 'normalizr';

export const artistSchema = new Schema('artists');
export const commentSchema = new Schema('comments');
export const trackSchema = new Schema('tracks');

trackSchema.define({
  user: artistSchema
});

commentSchema.define({
  user: artistSchema
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
