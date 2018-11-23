const { ApolloEngine } = require('apollo-engine')
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { Prisma } = require('../database/generated/prisma-client')
const binding = require('prisma-binding')

const resolvers = require('./resolvers')
// const newsDefs = require('./news/typeDefs.js')

const db = new binding.Prisma({
  typeDefs: 'database/generated/graphql-schema/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT
})

/* prisma client */
const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT
});

const pubsub = new PubSub();

const graphQLServer = new GraphQLServer({
  typeDefs: [
    'src/schema.graphql',
    // newsDefs
  ],
  resolvers,
  context: async req => ({
    ...req,
    db,
    prisma,
    pubsub,
    cache: {},
    service: await prisma.service({
      name: req.request.headers['x-service-name'] || process.env.DEFAULT_SERVICE_NAME
    })
  })
})

const port = parseInt(process.env.PORT, 10) || 4000;

if (process.env.ENGINE_API_KEY) {
  // With Apollo Engine
  const httpServer = graphQLServer.createHttpServer({
    tracing: true,
    cacheControl: {
      defaultMaxAge: 60
    }
  });

  const engine = new ApolloEngine({
    apiKey: process.env.ENGINE_API_KEY,
    // logging: {
    //   level: "DEBUG"
    // },
    // Specify behavior for how the Engine Proxy should connect to the
    // GraphQL origin (your Node GraphQL server). While the Proxy does
    // support multiple origins, most users will only put one origin
    // in this array.
    frontends: [{
      overrideGraphqlResponseHeaders: {
        'Access-Control-Allow-Origin': '*'
      }
    }],
    origins: [
      {
        // If you are using the apollo-link-batch-http package to combine
        // multiple GraphQL requests into a single HTTP request, set this
        // to ensure that the Engine Proxy sends them to your Node web
        // server as a single request as well. (If you don't set this,
        // the Proxy will split it apart into individual HTTP requests.)
        supportsBatch: true,
        // Amount of time to wait for your Node GraphQL server to return
        // a response before timing out. Defaults to "30s". Specified as
        // a string containing a number and a unit such as "ms" or "s".
        requestTimeout: "120s",
        // HTTP-specific options. (The options above also apply to other
        // origin types such as Lambda.)
      }
    ]
  })

  engine.on("error", err => {
    console.log("There was an error starting the server or Engine.");
    console.error(err);
    process.exit(1);
  })

  engine.listen({
    port,
    httpServer,
    graphqlPaths: ['/']
  },
    () => {
      console.log(`Server with Apollo Engine is running on http://localhost:${process.env.PORT}`)
    }
  )
} else {
  // Without Apollo Engine
  graphQLServer.start({
    port
  },
    () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`)
    }
  )
}
