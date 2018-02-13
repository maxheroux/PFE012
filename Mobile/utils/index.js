export const timeout = (ms, promise) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("timeout"))
    }, ms)
    promise.then(resolve, reject)
  })
}

export const objectToQueryString = (object) => {
  return Object.keys(object).map(function(k) {
    return encodeURIComponent(k) + "=" + encodeURIComponent(object[k]);
  }).join('&')
};

export const createUrl = (serverUrl, path, paramsObject) => {
  return `${serverUrl}${path}${objectToQueryString(paramsObject)}`;
}
