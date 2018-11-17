const parseCacheControl = require('parse-cache-control')

const toQueryString = (obj = {}) => {
  let str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p) && !!obj[p]) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const setCacheHintFromRes = (res, cacheControl) => {
  const cacheHeader = parseCacheControl(res.headers['cache-control'])
  if (cacheHeader) {
    cacheControl.setCacheHint({ maxAge: cacheHeader['max-age'] });
  }
}

module.exports = {
  toQueryString,
  setCacheHintFromRes
}