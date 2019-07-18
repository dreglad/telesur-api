const { merge } = require('lodash')
const Playlist = require('./Playlist')
const Video = require('./Video')

const User = {
  Query: {
    me (_, args, { db, service }, info) {
      return null;
    }
  }
}

const resolvers = merge(
  Playlist,
  Video,
  User
)

module.exports = resolvers;
