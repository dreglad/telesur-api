const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { uniq } = require('lodash');
const URL = require('url').URL;

async function crawlLinks(url) {
  const origin = new URL(url).origin;
  let urls = await fetch(url)
    .then(res => res.text())
    .then(text => cheerio.load(text))
    .then(
      $ => $('a')
        .map((i, el) => $(el).prop('href'))
        .get()
    )

  urls = [ ...new Set(urls) ]
    .filter(url => !url.startsWith('#') && !url.startsWith('http:'))
    .map(url => new URL(url, origin).href);

  return urls
}

module.exports = {
  crawlLinks
};