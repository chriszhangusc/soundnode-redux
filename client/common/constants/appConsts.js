export const isDev = process.env.NODE_ENV === 'development';

const HOST_DEV = 'http://127.0.0.1:3000';
const HOST_PROD = 'https://soundnode-redux.herokuapp.com';

export const API_PROXY_PROD = 'https://soundcloud-api-proxy.herokuapp.com';
export const API_PROXY_DEV = 'http://localhost:3001';
// export const API_HOST = isDev ? API_HOST_DEV : API_HOST_PROD;

export const API_PROXY = API_PROXY_PROD;

export const HOST = isDev ? HOST_DEV : HOST_PROD;
