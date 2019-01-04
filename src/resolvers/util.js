const parseCacheControl = require('parse-cache-control')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { URL } = require('url')
const { compact, uniq } = require('lodash')

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
  if (cacheHeader)
  cacheControl && cacheHeader && cacheControl.setCacheHint({
    maxAge: cacheHeader['max-age'] || 60
  })
}

function crawlLinks(crarwlUrls, selector = 'a, channel item link') {
  return Promise.all(uniq(compact(crarwlUrls)).map(crawlUrl => {
    const origin = new URL(crawlUrl).origin;
    return fetch(`${process.env.CACHE_PROXY_URL}${crawlUrl}`)
      .then(res => res.text())
      .then(text => cheerio.load(text, { xmlMode: true }))
      .then($ => $(selector).map((i, el) => {
        return $(el).prop('href') || $(el).text()
      }).get())
      .then(urls => (
        [ ...new Set(urls) ]
          .map(url => new URL(url, origin).href)
          .filter(url => url.startsWith('http'))
          .map(url => url.replace('http://', 'https://'))
        )
      );
  }));
}

function crawlDocuments(crarwlUrls, selector) {
  return Promise.all(uniq(compact(crarwlUrls)).map(crawlUrl => {
    const origin = new URL(crawlUrl).origin;
    return fetch(`${process.env.CACHE_PROXY_URL}${crawlUrl}`)
      .then(res => res.text())
      .then(text => cheerio.load(text, {xmlMode: true }))
      .then($ => $(selector).map((i, el) => $(el).text()).get());
    }));
}

module.exports = {
  crawlLinks,
  crawlDocuments,
  toQueryString,
  setCacheHintFromRes
};