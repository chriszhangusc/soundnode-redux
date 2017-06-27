export const isDev = process.env.NODE_ENV === 'development';

const HOST_DEV = 'http://127.0.0.1:3000';
const HOST_PROD = 'https://soundnode-redux.herokuapp.com';

const API_PROXY_PROD = 'https://soundcloud-api-proxy.herokuapp.com';
const API_PROXY_DEV = 'http://127.0.0.1:3001';


export const API_PROXY = isDev ? API_PROXY_DEV : API_PROXY_PROD;
export const HOST = isDev ? HOST_DEV : HOST_PROD;
