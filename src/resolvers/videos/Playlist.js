
const Query = {
  playlists (_, args, { db, service }, info) {
    return db.query.playlists(queryArgs({ args, service }), info);
  },

  playlistsConnection (_, args, { db, service }, info) {
    return db.query.playlistsConnection(queryArgs({ args, service }), info);
  },

  playlist (_, args, { db, service }, info) {
    if (db.exists.Playlist(queryArgs({ args, service }))) {
      return db.query.playlist(args, info);
    }
  }
};

function queryArgs({ args, service }) {
  return merge(
    args,
    {
      where: where({ where: args.where, service }),
      orderBy: 'datePublished_DESC',
      first: process.env.DEFAULT_PAGE_SIZE || 20
    }
  );
}

function where({ where, service }) {
  return merge(where, { service: { id: service.id } });
}

module.exports = {
  Query
};
