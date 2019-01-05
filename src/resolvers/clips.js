const { entries, omit } = require('lodash')
const pluralize = require('pluralize')

const resources = {
  Clip: 'clip',
  Serie: 'programa',
  Genre: 'tipo_clip',
  Category: 'categoria',
  Correspondent: 'corresponsal',
  Topic: 'tema'
};

const resolvers = entries(resources).reduce((prev, [typeName, restName]) => ({
  ...prev,

  Query: {
    ...prev.Query,
    // Single object
    [typeName.toLowerCase()]: (_, { id }, { dataSources }) => {
      return dataSources.clipsAPI.getOne(restName, id);
    },
    // List of objects query
    [pluralize(typeName.toLowerCase())]: (_, args, { dataSources }) => {
      return dataSources.clipsAPI.getAll(restName, args);
    },
    // Relay connection query
    [`${pluralize(typeName.toLowerCase())}Connection`]: async (_, args, { dataSources }) => {
      const count = await dataSources.clipsAPI.getAll(restName, args, { return: 'count' });
      return { aggregate: { count } };
    }
  },

  // Type resolver
  [typeName]: {
    ...(typeName === 'Clip'
      // relation fields for Clip
      ? entries(omit(resources, 'Clip'))
        .reduce((prev, [typeName, restName]) => ({
          ...prev,
          [typeName.toLowerCase()]: (clip, _, { dataSources }) => {
            return clip[restName] && dataSources.clipsAPI.reduce(restName, clip[restName])
          }
        }), {})
      // clips field for non Clip objects
      : {
        clips: (_, { id }, context) => {
          return resolvers.Query.clips(null, { [restName]: id }, context);
        }
      }
    )
  }
}), {});

// Custom resolvers
resolvers.Serie.episodes = (_, { id }, context) => {
  return resolvers.Query.clips(null, { serie: id, genre: 'programa' }, context);
}

module.exports = resolvers;
