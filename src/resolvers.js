const { merge } = require('lodash')
const videoResolvers = require('./videos/resolvers')
const newsResolvers = require('./news/resolvers')

const resolvers = {
  Query: {
    services (_, args, { db }, info) {
      return db.query.services(args, info)
    },

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