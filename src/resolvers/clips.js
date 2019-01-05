const { UserInputError } = require('apollo-server-core')
const { GraphQLError } = require('graphql')
const { setCacheHintFromRes } = require('./util')
const reducers = require('../datasources/clips/reducers')

const Query = {
  clips: buildRestListResolver('clip'),
  clipsConnection: buildRestConnectionResolver('clip'),
  clip: buildRestObjectResolver('clip'),

  series: buildRestListResolver('programa'),
  seriesConnection: buildRestConnectionResolver('programa'),
  serie: buildRestObjectResolver('programa'),

  genres: buildRestListResolver('tipo_clip'),
  genresConnection: buildRestConnectionResolver('tipo_clip'),
  genre: buildRestObjectResolver('tipo_clip'),

  categories: buildRestListResolver('categoria'),
  categoriesConnection: buildRestConnectionResolver('categoria'),
  category: buildRestObjectResolver('categoria'),

  correspondents: buildRestListResolver('corresponsal'),
  correspondentsConnection: buildRestConnectionResolver('corresponsal'),
  correspondent: buildRestObjectResolver('corresponsal'),

  topics: buildRestListResolver('tema'),
  topicsConnection: buildRestConnectionResolver('tema'),
  topic: buildRestObjectResolver('tema')
};

const typeResolvers = {
  Clip: {
    genre: buildClipRelationResolver('tipo_clip'),
    serie: buildClipRelationResolver('programa'),
    category: buildClipRelationResolver('categoria'),
    correspondent: buildClipRelationResolver('corresponsal'),
    topic: buildClipRelationResolver('tema')
  },

  Serie: {
    clips: buildRelatedClipsResolver('serie'),
    episodes: buildRelatedClipsResolver('serie', { genre: 'programa'}),
  },

  Genre: {
    clips: buildRelatedClipsResolver('genre')
  },

  Category: {
    clips: buildRelatedClipsResolver('category')
  },

  Correspondent: {
    clips: buildRelatedClipsResolver('correspondent')
  },

  Topic: {
    clips: buildRelatedClipsResolver('topic')
  },
};

function buildClipRelationResolver(relation) {
  return clip => clip[relation] && reducers[relation](clip[relation])
}

function buildRelatedClipsResolver(relation, params = {}) {
  return (_, { id }, context) => {
    return Query.clips(id, { [relation]: id, ...params }, context);
  };
}

function buildRestConnectionResolver(resource) {
  return async (_, args, { dataSources }) => {
    const count = await dataSources.clipsAPI.getAll(resource, args, { return: 'count '});    
    return { aggregate: { count } };
  };
}

function buildRestListResolver(resource) {
  return (_, args, { dataSources }) => {
    return dataSources.clipsAPI.getAll(resource, args);
  };
}

function buildRestObjectResolver(resource) {
  return (_, { id }, { dataSources }) => {
    return dataSources.clipsAPI.getOne(resource, id);
  };
};

module.exports = {
  Query,
  ...typeResolvers
}