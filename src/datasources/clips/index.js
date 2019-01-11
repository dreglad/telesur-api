const { RESTDataSource } = require('apollo-datasource-rest')
const { merge, omitBy, isUndefined } = require('lodash')
const reducers = require('./reducers')

class ClipsAPI extends RESTDataSource {
  get baseURL() {
    return `${process.env.CACHE_PROXY_URL}${this.context.service.videoRestUrl}`;
  }

  willSendRequest(request) {
    if (this.context.authToken) {
      request.params.set('autenticado', this.context.authToken);
    }
  }

  reducer(resource, data) {
    return reducers[resource](data);
  }

  async getOne(resource, id) {
    if (!id.trim().length) {
      throw new Error(`${resource} ID missing`);
    }
    const res = await this.get(`${resource}/${id}/`);
    return this.reducer(resource, res);
  }

  async getAll(resource, args) {
    const params = {
      limit: args.first,
      offset: args.skip || 0,
      orden: args.orderBy,
      return: args.return,
      counts: args.counts
    };

    if (resource === 'clip') {
      const { where = {} } = args;
      merge(params, {
        tipo: where.episodesOfSerie ? 'programa' : where.genre,
        programa: where.episodesOfSerie || where.serie,
        country_code: where.country,
        categoria: _buildRelationParam(where.category, where.categoryIsNull),
        corresponsal: _buildRelationParam(where.correspondent, where.correspondentIsNull),
        tema: _buildRelationParam(where.topic, where.topicIsNull)
      })
    }

    const res = await this.get(`${resource}/`, omitBy(params, isUndefined));
    if (params.return !== 'count') {
      // Return array of results
      return res && res.length
        ? res.map(obj => this.reducer(resource, obj))
        : [];
    } else {
      return res;
    }
  }

  getCount(resource, args) {
    return this.getAll(resource, merge(args, { return: 'count' }));
  }
}

function _buildRelationParam(relation, isNull) {
  return typeof isNull === 'undefined'
    ? relation
    : (isNull ? 'es_nulo' : 'no_es_nulo')
}

module.exports = ClipsAPI;
