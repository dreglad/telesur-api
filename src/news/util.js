const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { uniq } = require('lodash');
const URL = require('url').URL;

async function crawlLinks(url) {
  const origin = new URL(url).origin;
  let urls = await fetch(url)
    .then(res => res.text())
    .then(text => cheerio.load(text, {xmlMode: true }))
    .then($ => {
      const rssItems = $('channel item link');
      if (rssItems.length) {
        return rssItems.map((i, el) => $(el).text()).get();
      } else {
        return $('a').map((i, el) => $(el).prop('href')).get();
      }
    });

  urls = [ ...new Set(urls) ]
    .filter(url => !url.startsWith('#'))
    .map(url => new URL(url, origin).href);

  return urls.map(url => url.replace('http://', 'https://'))
}

module.exports = {
  crawlLinks
};