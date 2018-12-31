const { merge, flatten } = require('lodash');
const videoResolvers = require('./videos/resolvers');
const clipResolvers = require('./clips/resolvers');
const newsResolvers = require('./news/resolvers');
const { forwardTo } = require('prisma-binding');
const { crawlDocuments } = require('./utils');

const resolvers = {
  Query: {
    services (_, args, { db }, info) {
      return db.query.services(args, info)
    },

    servicesConnection: forwardTo('db'),

    service (_, args, { service }) {
      return service;
    },

    currentService (_, __, { service }) {
      return service;
    },

    async queryPublicDocument (_, { url, selector}, { db, service, prisma }, info) {
      if (!selector) { throw new Error('Selector required') }
      if (!url.startsWith('http')) { throw new Error('Invalid URL') }

      const res = await crawlDocuments([url] , selector);
      return flatten(res);
    }
  }
}

module.exports = merge(
  resolvers,
  clipResolvers,
  videoResolvers,
  newsResolvers
);