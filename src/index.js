const { importSchema } = require('graphql-import')
const binding = require('prisma-binding')
const { ApolloEngine } = require('apollo-engine')
const { ApolloServer } = require('apollo-server')
const { Prisma } = require('./generated/prisma-client')
const resolvers = require('./resolvers')

const port = parseInt(process.env.PORT, 10) || 4000;

const prismaEndpoint = process.env.PRISMA_ENDPOINT || 'http://127.0.0.1:4466';

const db = new binding.Prisma({
  typeDefs: 'src/generated/graphql-schema/prisma.graphql',
  endpoint: prismaEndpoint
});

const prisma = new Prisma({ endpoint: prismaEndpoint });

const server = new ApolloServer({
  typeDefs: importSchema('src/schema/schema.graphql'),
  resolvers,
  context: async ({req, res}) => ({
    db,
    prisma,
    token: req.headers['auth-token'],
    service: await prisma.service({
      name: req.headers['x-service-name'] || process.env.DEFAULT_SERVICE_NAME
    })
  }),
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
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
