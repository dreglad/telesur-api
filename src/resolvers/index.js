const { merge, flatten } = require('lodash')
const { parse } = require('url')
const { UserInputError } = require('apollo-server-core')
const { forwardTo } = require('prisma-binding')
const { crawlDocuments } = require('./util')
const videoResolvers = require('./videos')
const clipResolvers = require('./clips')
const newsResolvers = require('./news')

const serviceResolvers = {
  Query: {
    services (_, args, { db }, info) {
      return db.query.services(args, info)
    },

    servicesConnection: forwardTo('db'),

    service: forwardTo('db'),

    currentService: (_, __, { service }) => service,

    async queryPublicDocument (_, { url, selector}, { db, service }, info) {
      // Validaate input arguments
      if (!parse(url).hostname) {
        throw new UserInputError('Invalid URL', { url });
      } else if (!selector.trim().length) {
        throw new UserInputError('Invalid DOM selector', { selector });
      }

      const nodes = await crawlDocuments([url], selector);
      return flatten(nodes);
    }
  }
}

module.exports = merge({},
  serviceResolvers,
  clipResolvers,
  videoResolvers,
  newsResolvers
);
