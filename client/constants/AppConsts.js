// console.log(PORT);

const HOST_DEV = 'http://localhost:3000';
const HOST_PROD = 'https://redux-music.herokuapp.com';

// #TODO: change to dev
const API_HOST_DEV = 'http://localhost:3001'; // Will go through proxy and go to 3001, see config in webpack

const API_HOST_PROD = 'https://redux-music-api.herokuapp.com';

// PRODUCTION is from DefinePlugin in webpack
export const API_HOST = PRODUCTION ? API_HOST_PROD : API_HOST_DEV;

export const HOST = PRODUCTION ? HOST_PROD : HOST_DEV;
