import { large, t500x500 } from 'client/constants/ImageConstants';

export function imageExists(imageUrl) {
  const http = new XMLHttpRequest();
  http.open('HEAD', imageUrl, false);
  http.send();
  return http.status !== 404;
}

// Needs to be rewritten
export function formatImageUrl(rawUrl, size = t500x500) {
  // Check size
  if (rawUrl && rawUrl.indexOf(large) > -1) {
    return rawUrl.replace(large, size);
  }
  return rawUrl;
}
