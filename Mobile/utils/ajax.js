import { get } from 'lodash';
import { serverUrl } from '../config';

export class CustomError {
  constructor(message){
    this.message = message;
  }
}

export const timeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new CustomError("Le serveur prends trop de temps à repondre. Réessayer plus tard."))
    }, ms)
    promise.then(resolve, reject)
  })
}

export const detectAndThrowServerError = (dataReceived) => {
  if (get(dataReceived, 'error', false)) {
    throw new CustomError("Une erreur est survenu lors de la connection avec le serveur.");
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

export const performRequest = (request, successFn) => {
  return timeout(5000, request())
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      detectAndThrowServerError(data);
      if (data.Token == 'BAD_AUTHENTICATION') {
        throw new CustomError("Votre session n'est plus valide. Reconnectez vous.");
      } else {
        return successFn(data);
      }
    })
    .catch((error) => {
      if (error.message) {
        // if we already have a custom error message, we keep it.
        throw error;
      }
      throw new CustomError("Une erreur est survenu lors de la connection avec le server.");
    });
}
