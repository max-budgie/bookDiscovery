import apisauce from 'apisauce';

import { serverURL } from '../config';

function createApi(baseURL: string = serverURL) {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });

  return api;
}

export default (baseURL: string) => ({
  api: createApi(baseURL),
});
