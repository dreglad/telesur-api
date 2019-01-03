const { merge } = require('lodash')

const Article = require('./Article')
const ArticleSecion = require('./ArticleSection')

const resolvers = merge(
  Article,
  ArticleSecion
)

module.exports = resolvers;
