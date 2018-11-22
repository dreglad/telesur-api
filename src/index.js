require('dotenv').config()
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { ApolloEngine } = require('apollo-engine')
const { Prisma } = require('../database/generated/prisma-client')
const binding = require('prisma-binding')
const resolvers = require('./resolvers')
const { addDirectiveResolveFunctionsToSchema } = require('graphql-directive')
const { makeExecutableSchema } = require('graphql-tools')
const { importSchema } = require('graphql-import')

const db = new binding.Prisma({
  typeDefs: 'database/generated/graphql-schema/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT
})

/* prisma client */
const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT
});

const pubsub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs: [
    importSchema('src/schema.graphql'),
    newsDefs,
    // TODO: Implement directives
    `
    directive @markdown(fields: [String!]!) on FIELD | FIELD_DEFINITION
    `
  ],
  resolvers
});

// TODO: Implement directives
addDirectiveResolveFunctionsToSchema(schema, {
  async markdown(resolve, _, { fields }) {
    const result = await resolve()
    return result
  }
});

const graphQLServer = new GraphQLServer({
  schema,
  context: async req => ({
    ...req,
    db,
    prisma,
    pubsub,
    service: await prisma.service({
      name: req.request.headers['x-service-name'] || process.env.DEFAULT_SERVICE_NAME
    })
  })
})

if (!process.env.APOLLO_ENGINE_KEY) {
  // Without Apollo Engine
  graphQLServer.start({
    port: process.env.PORT
  }, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))
} else {
  // With Apollo Engine
  const engine = new ApolloEngine({
    apiKey: process.env.APOLLO_ENGINE_KEY,
  })

  const httpServer = graphQLServer.createHttpServer({
    tracing: true,
    cacheControl: {
      defaultMaxAge: 60
    }
  })

  engine.listen({
    httpServer,
    port: process.env.PORT,
    graphqlPaths: ['/'],
  }, () => console.log(`Server with Apollo Engine is running on http://localhost:${process.env.PORT}`))
}
