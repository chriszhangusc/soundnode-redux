const OAUTH_TOKEN = 'OAUTH_TOKEN';

export function getOAuthToken() {
  return sessionStorage.getItem(OAUTH_TOKEN);
}

export function setOAuthToken(token) {
  return sessionStorage.setItem(OAUTH_TOKEN, token);
}

export function removeOAuthToken() {
  return sessionStorage.removeItem(OAUTH_TOKEN);
}

export function isUnauthError(err) {
  return err && err.response && err.response.status === 401;
}

export function isAuthenticated() {
  return getOAuthToken();
}
