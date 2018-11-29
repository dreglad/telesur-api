const fetch = require('node-fetch')
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
    const { results } = await clipsFetch(service, args.where, args.first, args.skip);
    return results.map(mapClip);
  },
  clipsConnection: async (_, args, { service }) => {
    const { totalCount } = await clipsFetch(service, args.where, args.first, args.skip);
    return { aggregate: { count: totalCount } };
  },
  clip: async (_, { id }, { service }, { cacheControl }) => {
    const clip = mapClip(await restFetch(service, `/clip/${id}/`, { detalle: 'completo' }));
    if (cacheControl) {
      const maxAge = differenceInDays(new Date(), parse(clip.date)) ? 86400 : 60
      cacheControl.setCacheHint({ maxAge })
    }
    return clip;
  },

  series: (_, args, { service }, { cacheControl }) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.skip || 0 }
      restFetch(service, `/programa/`, params).catch(reject).then(res => {
        setCacheHintFromRes(res, cacheControl)
        res.json().then(programas => { resolve(programas.map(mapSerie)) }).catch(reject)
      })
    })
  },
  serie: (_, { id }, { service }, { cacheControl }) => {
    return new Promise((resolve, reject) => {
      restFetch(service, `/programa/${id}/`).catch(reject).then(res => {
        setCacheHintFromRes(res, cacheControl)
        res.json().then(programa => { resolve(mapSerie(programa)) }).catch(() => { resolve(null) })
      })
    })
  },

  genres: (_, args, { service }, { cacheControl }) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.skip || 0 }
      restFetch(service, `/tipo_clip/`, params).catch(reject).then(res => {
        res.json().then(tipos => { resolve(tipos.map(mapGenre)) }).catch(reject)
      })
    })
  },
  genre: (_, { id }, { service }) => {
    return new Promise((resolve, reject) => {
      restFetch(service, `/tipo_clip/${id}/`).catch(reject).then(res => {
        res.json().then(tipo => { resolve(mapGenre(tipo)) }).catch(() => { resolve(null) })
      })
    })
  },

  categories: (_, args, { service }) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.skip || 0 }
      restFetch(service, `/categoria/`, params).catch(reject).then(res => {
        res.json().then(categorias => { resolve(categorias.map(mapCategory)) }).catch(reject)
      })
    })
  },
  category: (_, { id }, { service }) => {
    return new Promise((resolve, reject) => {
      restFetch(service, `/categoria/${id}/`).catch(reject).then(res => {
        res.json().then(categoria => { resolve(mapCategory(categoria)) }).catch(() => { resolve(null) })
      })
    })
  },

  correspondents: (_, args, { service }) => {
    return new Promise((resolve, reject) => {
      const params = { pais: args.country, limit: args.first, offset: args.skip || 0 }
      restFetch(service, `/corresponsal/`, params).catch(reject).then(res => {
        res.json().then(corresponsales => { resolve(corresponsales.map(mapCorrespondent)) }).catch(reject)
      })
    })
  },
  correspondent: (_, { id }, { service }) => {
    return new Promise((resolve, reject) => {
      restFetch(service, `/corresponsal/${id}/`).catch(reject).then(res => {
        res.json().then(categoria => { resolve(mapCorrespondent(categoria)) }).catch(() => { resolve(null) })
      })
    })
  },

  topics: (_, args, { service }) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.skip || 0 }
      restFetch(service, `/tema/`, params).catch(reject).then(res => {
        res.json().then(temas => { resolve(temas.map(mapTopic)) }).catch(reject)
      })
    })
  },
  topic: (_, { id }, { service }) => {
    return new Promise((resolve, reject) => {
      restFetch(service, `/tema/${id}/`).catch(reject).then(res => {
        res.json().then(tema => { resolve(mapTopic(tema)) }).catch(() => { resolve(null) })
      })
    })
  }
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

const restFetch = ({ videoRestUrl }, path, params) => {
  return fetch(`${videoRestUrl}${path}/?${toQueryString(params)}`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data) && Object.keys(data).includes('totalCount')) {
        return data
      } else {
        return data
      }
    });
}

const clipsFetch = (service, where = {}, first, skip) => {
  const relation = (rel, isNull) => typeof isNull !== 'undefined' ? isNull && 'es_nulo' || 'no_es_nulo' : rel
  return restFetch(service, '/clip/', {
    counts: true,
    limit: first,
    offset: skip,
    tipo: where.episodesOfSerie ? 'programa' : where.genre,
    programa: where.episodesOfSerie || where.serie,
    country_code: where.country,
    categoria: relation(where.category, where.categoryIsNull),
    corresponsal: relation(where.correspondent, where.correspondentIsNull),
    tema: relation(where.topic, where.topicIsNull)
  })
};


module.exports = {
  Query,
  ...typeResolvers
}