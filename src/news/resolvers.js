const Query = {
  articles (_, args, { db }, info) {
    return db.query.articles(args, info)
  },
  articleSections (_, args, { db }, info) {
    return db.query.articleSections(args, info)
  }
}

module.exports = {
  Query
}
