const cheerio = require('cheerio');
const fetch = require('node-fetch');
const URL = require('url').URL;
const { compact, uniq } = require('lodash');

function crawlLinks(crarwlUrls) {
  return Promise.all(uniq(compact(crarwlUrls)).map(crawlUrl => {
    const origin = new URL(crawlUrl).origin;
    return fetch(crawlUrl)
      .then(res => res.text())
      .then(text => cheerio.load(text, {xmlMode: true }))
      .then($ => {
        const rssItems = $('channel item link');
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

module.exports = {
  crawlLinks
};