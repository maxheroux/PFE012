import { get } from 'lodash';
import { serverUrl } from '../config';

export const timeout = (ms, promise) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
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
  return Object.keys(object).map(function(k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(object[k]);
  }).join('&')
};

export const createUrl = (path, paramsObject) => {
  return `${serverUrl}${path}?${objectToQueryString(paramsObject)}`;
}
