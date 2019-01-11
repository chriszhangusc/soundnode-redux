import * as humps from 'humps';

export function parseResponse(response): any {
  return response.data;
}

export function camelizeData(data): any {
  return humps.camelizeKeys(data);
}
