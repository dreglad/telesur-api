const { merge } = require('lodash')

const Query = {
  videos (_, args, { db, service }, info) {
    return db.query.videos(queryArgs({ args, service }), info);
  },

  videosConnection (_, args, { db, service }, info) {
    return db.query.videosConnection(queryArgs({ args, service }), info);
  },

  video (_, args, { db, service }, info) {
    if (db.exists.Video(queryArgs({ args, service }))) {
      return db.query.video(args, info);
    }
  }
};

function queryArgs({ args, service }) {
  return merge(
    args,
    {
      where: where({ where: args.where, service }),
      orderBy: 'datePublished_DESC',
      first: 20
    }
  );
}

function where({ where, service }) {
  return merge(where, { service: { id: service.id } });
}

module.exports = {
  Query
};