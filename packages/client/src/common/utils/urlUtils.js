export function setUrlParams(url, params) {
  const newUrl = new URL(url);
  Object.entries(params).forEach(([key, value]) => {
    newUrl.searchParams.set(key, value);
  });
  return newUrl.toString();
}
