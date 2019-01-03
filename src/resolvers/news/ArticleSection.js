const { merge } = require('lodash')
const { forwardTo } = require('prisma-binding')

const Query = {
  articleSections (_, args, { db, service }, info) {
    return db.query.articleSections(queryArgs({ args, service }), info);
  },
  articleSectionsConnection (_, args, { db, service }, info) {
    return db.query.articleSectionsConnection(queryArgs({ args, service }), info);
  },
  articleSection: forwardTo('db')
};

function queryArgs ({ args, service }) {
  return merge(
    args,
    {
      where: {
        articles_some: { service: { id: service.id } }
      }
    }
  );
};

module.exports = {
  Query
}
