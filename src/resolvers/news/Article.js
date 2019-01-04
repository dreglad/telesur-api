const { compact, concat, flatten, get, merge, omit } = require('lodash')
const { crawlLinks } = require('../util')

const Query = {
  async articles (_, args, { db, service }, info) {
    return db.query.articles(await queryArgs({ args, service }), info);
  },

  async articlesConnection (_, args, { db, service }, info) {
    return db.query.articlesConnection(await queryArgs({ args, service }), info);
  },

  article (_, args, { db, service }, info) {
    if (db.exists.Article(queryArgs({ args, service }))) {
      return db.query.article(args, info);
    }
  }
};

async function queryArgs ({ args, service }) {
  const askedUrls = compact(concat(args.foundInUrl, args.foundInUrls));
  const url_in = askedUrls.length
    ? compact(flatten(await crawlLinks(askedUrls)))
    : get(args, 'where.url_in', undefined);
  const res = merge(
    omit(args, ['foundInUrl', 'foundInUrls', 'where.url_in']),
    {
      orderBy: 'datePublished_DESC',
      first: args.first || 20,
      where: {
        url_in,
        service: { id: service.id }
      }
    }
  );

  return res;
};

module.exports = {
  Query
};
