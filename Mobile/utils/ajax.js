import { get } from 'lodash';
import { serverUrl } from '../config';

export const timeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export const detectAndThrowServerError = (dataReceived) => {
  if (get(dataReceived, 'error', false)) {
    reject(new Error("server error"));
  }
}

export const objectToQueryString = (object) => {
  return Object.keys(object).map((k) => {
    return encodeURIComponent(k) + "=" + encodeURIComponent(object[k]);
  }).join('&');
};

export const createGetRequest = (path, paramsObject) => {
  return () => fetch(`${serverUrl}${path}?${objectToQueryString(paramsObject)}`);
}

export const createPostRequest = (path, paramsObject) => {
  return () => fetch(`${serverUrl}${path}`, {
    method: 'post',
    body: JSON.stringify(paramsObject)
  });
}
