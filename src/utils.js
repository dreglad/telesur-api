const parseCacheControl = require('parse-cache-control')
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const URL = require('url').URL;
const { compact, uniq } = require('lodash');

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

function crawlLinks(crarwlUrls, selector) {
  return Promise.all(uniq(compact(crarwlUrls)).map(crawlUrl => {
    const origin = new URL(crawlUrl).origin;
    return fetch(`${process.env.CACHE_PROXY_URL}${crawlUrl}`)
      .then(res => res.text())
      .then(text => cheerio.load(text, { xmlMode: true }))
      .then($ => {
        const rssItems = $(selector);
        if (rssItems.length) {
          return rssItems.map((i, el) => $(el).text()).get();
        } else {
          return $('a').map((i, el) => $(el).prop('href')).get();
        }
      })
      .then(urls => {
        return [ ...new Set(urls) ]
          .filter(url => !url.startsWith('#'))
          .map(url => new URL(url, origin).href)
          .map(url => url.replace('http://', 'https://'))
      });
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