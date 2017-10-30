// export const CLIENT_ID = 'f9e1e2232182a46705c880554a1011af'; // Sound Cloud ClientID
import { HOST, isDev } from './appConsts';

export const CLIENT_ID = isDev
  ? 'ZsXqrJ5fvCT0kw8AbbJARqxuRVYqAVEX'
  : 'RgnaiRGxy8TgqHhWe1DLdTXxMRrA04Z9'; // This is for redux-music.heroku...

export const REDIRECT_URI = `${HOST}/callback`;
