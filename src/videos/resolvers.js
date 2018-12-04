const { merge } = require('lodash')

const Query = {
  videos (_, args, { db, service }, info) {
    return db.query.videos(merge(args, {
      orderBy: 'datePublished_DESC',
      first: 20,
      where: {
        service: { id: service.id }
      }
    }), info)
  },

  videosConnection (_, args, { db, service }, info) {
    return db.query.videosConnection(merge(args, {
      orderBy: 'datePublished_DESC',
      first: 20,
      where: {
        service: { id: service.id }
      }
    }), info)
  },

  video (_, args, { db, service }, info) {
    return db.query.video({
      where: {
        service: { id: service.id },
        ...args
      }
    }, info)
  },

  playlists (_, args, { db, service }, info) {
    return db.query.playlists(merge(args, {
      where: { service: { id: service.id } }
    }), info)
  },

  playlistsConnection (_, args, { db, service }, info) {
    return db.query.playlistsConnection(merge(args, {
      where: { service: { id: service.id } }
    }), info)
  },

  async playlist (_, args, { db, service, prisma }, info) {
    const has_service_articles = await prisma.$exists.playlist({
      service: { id: service.id }
    })
    return has_service_articles
      ? db.query.playlist({ where: args }, info)
      : null
  }
}

const resolvers = {
  Query,
  Article: {
  }
}

module.exports = resolvers;
