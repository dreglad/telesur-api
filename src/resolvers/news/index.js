const { merge } = require('lodash')
const Article = require('./Article')
const ArticleSection = require('./ArticleSection')

const resolvers = merge(
  Article,
  ArticleSection
);

module.exports = resolvers;
