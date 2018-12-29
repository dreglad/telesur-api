const { merge } = require('lodash');
const videoResolvers = require('./videos/resolvers');
const clipResolvers = require('./clips/resolvers');
const newsResolvers = require('./news/resolvers');
const { forwardTo } = require('prisma-binding');

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
    }
  }
}

module.exports = merge(
  resolvers,
  clipResolvers,
  videoResolvers,
  newsResolvers
);