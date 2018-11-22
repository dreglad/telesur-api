const Query = {
  articles (_, args, { db }, info) {
    return db.query.articles(args, info)
  },

  articleSections (_, args, { db }, info) {
    return db.query.articleSections(args, info)
  },

  articleSection (_, args, { db }, info) {
    return db.query.articleSection(args, info)
  },

  articlesCount(_, args, { prisma }) {
    return prisma.articlesConnection().aggregate().count()
  }
}

module.exports = {
  Query
}
