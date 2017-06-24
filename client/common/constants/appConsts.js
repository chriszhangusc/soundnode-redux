// console.log(PORT);
const isDev = process.env.NODE_ENV === 'development';

const HOST_DEV = 'http://127.0.0.1:3000';
const API_HOST_DEV = 'http://127.0.0.1:3001';

const HOST_PROD = 'https://redux-music.herokuapp.com';
// #TODO: change to dev
const API_HOST_PROD = 'https://redux-music-api.herokuapp.com';

export const API_HOST = isDev ? API_HOST_DEV : API_HOST_PROD;

export const HOST = isDev ? HOST_DEV : HOST_PROD;
