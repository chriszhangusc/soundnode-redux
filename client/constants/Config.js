export const CLIENT_ID = 'f9e1e2232182a46705c880554a1011af'; // Sound Cloud ClientID

const API_HOST_DEV = 'http://localhost:3000'; // Will go through proxy and go to 3001, see config in webpack


// #TODO: Should be heroku api server!!!
const API_HOST_PROD = 'https://redux-music-api.herokuapp.com';

// PRODUCTION is from DefinePlugin in webpack
export const API_HOST = PRODUCTION ? API_HOST_PROD : API_HOST_DEV;
