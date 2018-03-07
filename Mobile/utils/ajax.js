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
    headers: { "Content-Type" : "text/plain" },
    body: JSON.stringify(paramsObject)
  });
}

export const performRequest = (request, successFn, errorAction, dispatch, done) => {
  timeout(5000, request())
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      detectAndThrowServerError(data);
      if (data.value == 'BAD_AUTHENTICATION') {
        dispatch(errorAction('Les informations sont invalides.'));
      } else {
        successFn(data);
      }
    })
    .catch(() => {
      dispatch(errorAction('Une erreur est survenu lors de la connection avec le server.'));
    })
    .then(() => done());
}
