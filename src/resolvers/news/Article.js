const { compact, concat, flatten, get, merge, omit } = require('lodash')
const { crawlLinks } = require('../util')

const Query = {
  async articles (_, args, { db, service }, info) {
    return db.query.articles(queryArgs({ args, service }), info);
  },

  async articlesConnection (_, args, { db, service }, info) {
    return db.query.articlesConnection(queryArgs({ args, service }), info);
  },

  article (_, args, { db, service }, info) {
    if (db.exists.Article(queryArgs({ args, service }))) {
      return db.query.article(args, info);
    }
  }
};

async function queryArgs ({ args, service }) {
  // URLs where to search for reference links
  const url_in = compact(concat(
    // Crawl and concatenate any extracted links
    flatten(await crawlLinks(concat(args.foundInUrl, args.foundInUrls))),
    // Concatenate to any passed url_in value  
    get(args, 'where.url_in'),
  ));
  return merge(
    omit(args, ['foundInUrl', 'foundInUrls']),
    {
      orderBy: 'datePublished_DESC',
      first: args.first || 20,
      where: {
        url_in: url_in.length ? url_in : undefined,
        service: { id: service.id }
      }
    }
  );
};

module.exports = {
  Query
};
