const { compact, concat, flatten, get, merge, omit } = require('lodash');
const { crawlLinks } = require('../utils');

const Query = {
  async articles (_, args, { db, service }, info) {
    return db.query.articles(await articlesQueryParams(args, service), info);
  },

  async articlesConnection (_, args, { db, service }, info) {
    return db.query.articlesConnection(await articlesQueryParams(args, service), info);
  },

  article (_, args, { db, service }, info) {
    return db.query.article(args, info);
  },

  articleSections (_, args, { db, service }, info) {
    return db.query.articleSections(merge(args, {
      where: {
        articles_some: { service: { id: service.id } }
      }
    }), info)
  },

  articleSectionsConnection (_, args, { db, service }, info) {
    return db.query.articleSectionsConnection(merge(args, {
      where: {
        articles_some: { service: { id: service.id } }
      }
    }), info)
  },

  async articleSection (_, args, { db, service, prisma }, info) {
    const has_service_articles = await prisma.$exists.article({
      sections_some: args,
      service: { id: service.id }
    })
    return has_service_articles
      ? db.query.articleSection({ where: args }, info)
      : null
  }
};

async function articlesQueryParams(args, service) {
  // URLs where to search for reference links
  const url_in = compact(concat(
    // Crawl and concatenate any extracted links
    flatten(await crawlLinks(concat(args.foundInUrl, args.foundInUrls))),
    // Concatenate to any passed url_in value  
    get(args, 'where.url_in'),
  ));

  const params = merge(
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

  return params;
}

const resolvers = {
  Query,
  Article: {
  }
}

module.exports = resolvers;