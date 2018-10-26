require('dotenv').config()
const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start({
  port: process.env.PORT
}, () => console.log(`Server is running on http://localhost:${process.env.PORT}`))
