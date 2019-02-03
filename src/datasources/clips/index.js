const { RESTDataSource } = require('apollo-datasource-rest')
const { merge, omitBy, isNil, get } = require('lodash')
const reducers = require('./reducers')

class ClipsAPI extends RESTDataSource {
  get baseURL() {
    return `${process.env.CACHE_PROXY_URL}${this.context.service.videoRestUrl}`;
  }

  willSendRequest(request) {
    if (this.context.idToken) {
      request.params.set('autenticado', this.context.idToken);
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
    const { where = {} } = args;
    const id = where.id || (where.id_in !== [] ? where.id_in : undefined);
    const params = {
      limit: args.first,
      offset: args.skip || 0,
      orden: args.orderBy,
      return: args.return,
      counts: args.counts,
      texto: where.search,
      id: Array.isArray(id) && id.length == 0 ? undefined : id
    };

    switch (resource) {
      case 'clip':
        merge(params, {
          tipo: get(where, 'episodesOfSerie.id') ? 'programa' : get(where, 'genre.id') || get(where, 'genre.id_in') || where.genre_in,
          programa: _buildRelationParam(get(where, 'episodesOfSerie.id') || get(where, 'serie.id') || get(where, 'serie.id_in'), where.serie_null),
          categoria: _buildRelationParam(get(where, 'category.id'), where.category_null) || get(where, 'category.id_in') || where.category_in,
          corresponsal: _buildRelationParam(get(where, 'correspondent.id'), where.correspondent_null) ||  get(where, 'correspondent.id_in') || where.correspondent_in,
          tema: _buildRelationParam(get(where, 'topic.id') || get(where, 'topic.id_in') || where.topic_id, where.topic_null),
          publicado: where.published,
          country_code: where.country || where.country_in
        });
        break;
      case 'corresponsal':
        merge(params, {
          country_code: where.country || where.country_in
        });
    }

    const res = await this.get(`${resource}/`, omitBy(params, isNil));
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
  return typeof isNull === 'boolean'
    ? (isNull ? 'es_nulo' : 'no_es_nulo')
    : relation !== [] ? relation : undefined
}

module.exports = ClipsAPI;
