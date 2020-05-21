const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { Prisma } = require('./generated/prisma-client');
const { importSchema } = require('graphql-import');
const binding = require('prisma-binding');
const resolvers = require('./resolvers');
const ClipsAPI = require('./datasources/clips');

// Config
const defaultServiceName = process.env.DEFAULT_SERVICE_NAME || 'default';
const jwtPublicKey = process.env.JWT_PUBLIC_KEY;
const engineApiKey = process.env.ENGINE_API_KEY;
const probeUserAgent = process.env.PROBE_USER_AGENT;
const port = parseInt(process.env.PORT, 10) || 5000;

// Prisma
const endpoint = process.env.PRISMA_ENDPOINT || 'http://127.0.0.1:4466';
const prismaSchema = 'src/generated/graphql-schema/prisma.graphql';

// GraphQL schema
const typeDefs = importSchema('src/schema/schema.graphql');

// Database
const prisma = new Prisma({ endpoint });

const db = new binding.Prisma({
  endpoint,
  typeDefs: prismaSchema
});

const dataSources = () => ({
  clipsAPI: new ClipsAPI()
});

// Resolver context
const context = async ({ req, res }) => {
  const idToken = (req.headers['authorization'] || '').replace('Bearer ', '');
  const serviceName = req.headers['x-service-name'] || defaultServiceName;
  const service = await prisma.service({ name: serviceName });

  if (!service) {
    throw new Error('Unable to locate service');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(idToken, jwtPublicKey, (error, user) => {
      resolve({
        db,
        prisma,
        user,
        idToken,
        service
      });
    });
  });
};

// GraphQL Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources,
  tracing: true,
  cacheControl: {
    defaultMaxAge: 60
  },
  formatError: error => {
    if (process.env.NODE_ENV === 'production') {
      // Don't send stacktrace to clients
      delete error.extensions.exception.stacktrace;
    }

    return error;
  }
});

const app = express();

app.use(morgan('combined'));

// Health probe
if (probeUserAgent) {
  app.use('/', (req, res, next) => {
    if (req.headers['user-agent'].match(new RegExp(probeUserAgent))) {
      res.send('Ok');
    } else {
      next();
    }
  });
}

server.applyMiddleware({ app, path: '/' });

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  )
);

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
