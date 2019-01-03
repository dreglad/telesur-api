const { GraphQLError } = require('graphql');
const { UserInputError } = require('apollo-server-core');
const { parse } = require('url');
const { forwardTo } = require('prisma-binding');
const { merge, flatten } = require('lodash');
const { crawlDocuments } = require('./utils');
const videoResolvers = require('./videos/resolvers');
const clipResolvers = require('./clips/resolvers');
const newsResolvers = require('./news/resolvers');

const resolvers = {
  Query: {
    services (_, args, { db }, info) {
      return db.query.services(args, info)
    },

    servicesConnection: forwardTo('db'),

    service (_, __, { service }) {
      return service;
    },

    currentService (_, __, { service }) {
      return service;
    },

    async queryPublicDocument (_, { url, selector}, { db, service }, info) {
      // Validaate input arguments
      parse(url).hostname ||
        (() => { throw new GraphQLError('Invalid or missing URL') })();
      selector.trim().length ||
        (() => { throw new GraphQLError('Missing DOM selector') })();

      const nodes = await crawlDocuments([url], selector);
      return flatten(nodes);
    }
  }
}

module.exports = merge(
  resolvers,
  clipResolvers,
  videoResolvers,
  newsResolvers
);