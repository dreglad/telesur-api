const { RESTDataSource } = require('apollo-datasource-rest')
const { merge, omitBy, isUndefined } = require('lodash')
const reducers = require('./reducers')

class ClipsAPI extends RESTDataSource {
  get baseURL() {
    return `${process.env.CACHE_PROXY_URL}${this.context.service.videoRestUrl}`;
  }

  async getOne(resource, id, params = {}) {
    if (!resource in reducers) {
      throw new Error(`Resource not in reducers: ${resource}`);
    }
    const res = await this.get(`${resource}/${id}/`, params);
    return reducers[resource](res);
  }

  async getAll(resource, args, params = {}) {
    if (!resource in reducers) {
      throw new Error(`Resource not in reducers: ${resource}`);
    }
    merge(params, {
      limit: args.first,
      offset: args.skip || 0,
      orden: args.orderBy,
      return: args.return,
      counts: args.counts
    });

    if (resource === 'clip') {
      const relation = (rel, isNull) => typeof isNull !== 'undefined' ? isNull && 'es_nulo' || 'no_es_nulo' : rel;
      const { where = {} } = args;
      merge(params, {
        tipo: where.episodesOfSerie ? 'programa' : where.genre,
        programa: where.episodesOfSerie || where.serie,
        country_code: where.country,
        categoria: relation(where.category, where.categoryIsNull),
        corresponsal: relation(where.correspondent, where.correspondentIsNull),
        tema: relation(where.topic, where.topicIsNull)
      })
    }

    const res = await this.get(`${resource}/`, omitBy(params, isUndefined));
    return res && res.length
      ? res.map(item => reducers[resource](item))
      : [];
  }
}

module.exports = ClipsAPI;
