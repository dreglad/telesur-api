const fetch = require('node-fetch')
const { UserInputError } = require('apollo-server-core');
const { GraphQLError } = require('graphql');
const { isEmpty } = require('lodash');
const { toQueryString, setCacheHintFromRes } = require('../utils')
const differenceInDays = require('date-fns/difference_in_days')
const parse = require('date-fns/parse')
const {
  mapClip,
  mapSerie,
  mapGenre,
  mapCategory,
  mapCorrespondent,
  mapTopic
} = require('./mappers')

const Query = {
  clips: async (_, args, { service }) => {
    const results = await clipsFetch(service, args);
    return results.map(mapClip);
  },
  clipsConnection: async (_, args, { service }) => {
    const count = await clipsFetch(service, { ...args, return: 'count' });
    return { aggregate: { count } };
  },
  clip: buildRestObjectResolver('clip', mapClip),

  series: buildRestListResolver('programa', mapSerie),
  seriesConnection: buildRestConnectionResolver('programa', mapSerie),
  serie: buildRestObjectResolver('programa', mapSerie),

  genres: buildRestListResolver('tipo_clip', mapGenre),
  genresConnection: buildRestConnectionResolver('tipo_clip', mapGenre),
  genre: buildRestObjectResolver('tipo_clip', mapGenre),

  categories: buildRestListResolver('categoria', mapCategory),
  categoriesConnection: buildRestConnectionResolver('categoria', mapCategory),
  category: buildRestObjectResolver('categoria', mapCategory),

  correspondents: buildRestListResolver('corresponsal', mapCorrespondent),
  correspondentsConnection: buildRestConnectionResolver('corresponsal', mapCorrespondent),
  correspondent: buildRestObjectResolver('corresponsal', mapCorrespondent),

  topics: buildRestListResolver('tema', mapTopic),
  topicsConnection: buildRestConnectionResolver('tema', mapTopic),
  topic: buildRestObjectResolver('tema', mapTopic)
}

const typeResolvers = {
  Serie: {
    episodes: ({ id }, args, ctx) => Query.clips(id, { serie: id, genre: 'programa', ...args }, ctx),
  },

  Clip: {
    genre: clip => clip.tipo && mapGenre(clip.tipo),
    serie: clip => clip.programa && mapSerie(clip.programa),
    category: clip => clip.categoria && mapCategory(clip.categoria),
    correspondent: clip => clip.corresponsal && mapCorrespondent(clip.corresponsal),
    topic: clip => clip.tema && mapTopic(clip.tema)
  },

  Genre: {
    clips: ({ id }, args, ctx) => Query.clips(id, { genre: id, ...args }, ctx)
  },

  Category: {
    clips: ({ id }, args, ctx) => Query.clips(id, { category: id, ...args }, ctx)
  },

  Correspondent: {
    clips: ({ id }, args, ctx) => Query.clips(id, { correspondent: id, ...args }, ctx)
  },

  Topic: {
    clips: ({ id }, args, ctx) => Query.clips(id, { topic: id, ...args }, ctx)
  },
};

function buildRestConnectionResolver(resource, mapper) {
  return async (_, { first, skip }, { service }) => {
    const params = { limit: first || 1000, offset: skip || 0, return: 'count' };
    const count = await restFetch(service, `/${resource}/`, params);
    return { aggregate: { count } };
  };
}

function buildRestListResolver(resource, mapper) {
  return async (_, { first, skip, orderBy }, { service }) => {
    const params = { limit: first, offset: skip || 0, orden: orderBy };
    const results = await restFetch(service, `/${resource}/`, params);
    return results.map(mapper);
  };
}

function buildRestObjectResolver(resource, mapper) {
  return async (_, { id }, { service }) => {
    // Validate input
    if (id.trim().length < 2) {
      throw new GraphQLError('Invlaid or empty id provided');
    }
    // load data
    const result = await restFetch(service, `/${resource}/${id}/`);
    return (result && !isEmpty(result))
      ? mapper(result)
      : null
  };
};

const clipsFetch = (service, args) => {
  const relation = (rel, isNull) => typeof isNull !== 'undefined' ? isNull && 'es_nulo' || 'no_es_nulo' : rel
  const { where = {} } = args;
  return restFetch(service, '/clip/', {
    limit: args.first,
    offset: args.skip,
    return: args.return,
    counts: args.counts,
    tipo: where.episodesOfSerie ? 'programa' : where.genre,
    programa: where.episodesOfSerie || where.serie,
    country_code: where.country,
    categoria: relation(where.category, where.categoryIsNull),
    corresponsal: relation(where.correspondent, where.correspondentIsNull),
    tema: relation(where.topic, where.topicIsNull)
  })
};

const restFetch = ({ videoRestUrl }, path, params) => {
  return fetch(`${process.env.CACHE_PROXY_URL}${videoRestUrl}${path}/?${toQueryString(params)}`)
    .then(res => res.json().catch(() => null));
};

module.exports = {
  Query,
  ...typeResolvers
}