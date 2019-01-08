const { merge } = require('lodash')
const Playlist = require('./Playlist')
const Video = require('./Video')

const resolvers = merge(
  Playlist,
  Video
)

module.exports = resolvers;
