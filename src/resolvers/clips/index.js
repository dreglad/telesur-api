const { entries, omit } = require('lodash')
const pluralize = require('pluralize')
const resources = require('./resources')

const resolvers = entries(resources).reduce((prev, [typeName, restName]) => ({
  ...prev,

  Query: {
    ...prev.Query,
    // Single object
    [typeName.toLowerCase()]: (_, { where }, { dataSources }) => {
      return dataSources.clipsAPI.getOne(restName, where.id);
    },
    // List of objects query
    [pluralize(typeName.toLowerCase())]: (_, args, { dataSources }) => {
      return dataSources.clipsAPI.getAll(restName, args);
    },
    // Relay connection query
    [`${pluralize(typeName.toLowerCase())}Connection`]: async (_, args, { dataSources }) => {
      const count = await dataSources.clipsAPI.getCount(restName, args);
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
            return clip[restName] && dataSources.clipsAPI.reducer(restName, clip[restName])
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
