require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const { ApolloEngine } = require('apollo-engine')
const resolvers = require('./resolvers')

const graphQLServer = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
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