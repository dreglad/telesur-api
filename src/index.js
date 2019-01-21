const jwt = require('jsonwebtoken');
const { importSchema } = require('graphql-import')
const binding = require('prisma-binding')
const { ApolloEngine } = require('apollo-engine')
const { ApolloServer } = require('apollo-server')
const { Prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers')
const ClipsAPI = require('./datasources/clips')

const port = parseInt(process.env.PORT, 10) || 4000;

const prismaEndpoint = process.env.PRISMA_ENDPOINT || 'http://127.0.0.1:4466';

const db = new binding.Prisma({
  typeDefs: 'src/generated/graphql-schema/prisma.graphql',
  endpoint: prismaEndpoint
});

const prisma = new Prisma({ endpoint: prismaEndpoint });

const dataSources = () => ({
  clipsAPI: new ClipsAPI()
});

const context = async ({ req, res }) => {
  const idToken = (req.headers['authorization'] || '').replace('Bearer ', '');
  const service = await prisma.service({
    name: req.headers['x-service-name'] || process.env.DEFAULT_SERVICE_NAME
  })

  return new Promise((resolve, reject) => {
    jwt.verify(idToken, process.env.JWT_PUBLIC_KEY, (error, user) => {
      resolve({
        db,
        prisma,
        user,
        service
      });
    });
  })
};

const typeDefs = importSchema('src/schema/schema.graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources,
  tracing: true,
  cacheControl: {
    defaultMaxAge: 60
  },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    generateClientInfo: ({ request }) => {
      const headers = request.http & request.http.headers;
      if (headers) {
        return {
          clientName: headers['apollo-client-name'],
          clientVersion: headers['apollo-client-version'],
        };
      } else {
        return {
          clientName: "Unknown Client",
          clientVersion: "Unversioned",
        };
      }
    },
  },
  formatError: error => {
    // Don't send stacktrace to clients
    delete error.extensions.exception.stacktrace;
    return error;
  }
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test')
  server
    .listen({ port })
    .then(({ url }) => console.log(`🚀 app running at ${url}`));

// export all the important pieces for integration/e2e tests to use
module.exports = {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  ClipsAPI,
  server
};
