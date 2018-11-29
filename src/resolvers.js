const { merge } = require('lodash');
const videoResolvers = require('./videos/resolvers');
const newsResolvers = require('./news/resolvers');
const { forwardTo } = require('prisma-binding');

const resolvers = {
  Query: {
    services (_, args, { db }, info) {
      return db.query.services(args, info)
    },

    servicesConnection: forwardTo('db'),

    service (_, { id, name }, { prisma, service }, info) {
      return id || name
        ? prisma.service({ id, name })
        : service
    }
  }
}

module.exports = merge(
  resolvers,
  videoResolvers,
  newsResolvers
)