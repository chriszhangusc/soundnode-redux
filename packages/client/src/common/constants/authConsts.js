import { HOST, isDev } from './appConsts';

export const CLIENT_ID = isDev
  ? 'ZsXqrJ5fvCT0kw8AbbJARqxuRVYqAVEX'
  : 'RgnaiRGxy8TgqHhWe1DLdTXxMRrA04Z9';

export const REDIRECT_URI = `${HOST}/callback`;
