const TurndownService = require('turndown')
// const { Converter } = require('showdown')
const { merge } = require('lodash')

const Query = {
  articles (_, args, { db, service }, info) {
    return db.query.articles(merge(args, {
      orderBy: 'datePublished_DESC',
      first: 20,
      where: {
        service: { id: service.id }
      }
    }), info)
  },

  article (_, args, { db, service }, info) {
    return db.query.article({
      where: {
        service: { id: service.id },
        ...args
      }
    }, info)
  },

  articleSections (_, args, { db, service }, info) {
    return db.query.articleSections(merge(args, {
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
  },

  articlesCount(_, args, { prisma, service }) {
    return prisma.articlesConnection(merge(args, {
      where: { service: { id: service.id } }
    })).aggregate().count()
  }
}


const resolvers = {
  Query,
  Article: {
    bodyTurnDown (article, args, { prisma }, info) {
      return new TurndownService().turndown(article.body);
    },

    bodyShowDown (article, args, { db }, info) {
    }
  }
}

module.exports = resolvers;