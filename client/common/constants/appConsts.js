export const isDev = process.env.NODE_ENV === 'development';

const HOST_DEV = 'http://localhost:3000';
const HOST_PROD = 'https://redux-music.herokuapp.com';

// Proxy server urls
const API_PROXY_DEV = 'http://localhost:3001';
const API_PROXY_PROD = 'https://soundcloud-api-proxy.herokuapp.com';


export const API_PROXY = isDev ? API_PROXY_DEV : API_PROXY_PROD;
export const HOST = isDev ? HOST_DEV : HOST_PROD;
