const fetch = require('node-fetch')
const { toQueryString, setCacheHintFromRes } = require('./utils')
const {
  mapClip,
  mapSerie,
  mapGenre,
  mapCategory,
  mapCorrespondent,
  mapTopic
} = require('./mappers')

const services = [
  {
    id: 'telesur',
    name: 'teleSUR',
    language: 'es',
    url: 'https://videos.telesurtv.net/',
    apiUrl: `${process.env.REST_URL}/api`
  },
  {
    id: 'telesur-en',
    name: 'teleSUR English',
    language: 'en',
    url: 'https://videos.telesurenglish.net/',
    apiUrl: `${process.env.REST_URL}/en/api`
  }
]

const restFetch = ({ service }, path, params) => {
  service = services.find(serv => serv.id === (service || 'telesur'))
  return !!service
    ? fetch(`${service.apiUrl}${path}/?${toQueryString(params)}`)
    : Promise.reject(new Error('Invalid service'))
}

const Query = {
  services: () => services,
  service: (_, { id }) => services.find(service => service.id === id),

  clips: (_, args) => {
    const relation = (rel, isNull) =>
      typeof isNull !== 'undefined'
        ? isNull && 'es_nulo' || 'no_es_nulo'
        : rel
    return new Promise((resolve, reject) => {
      restFetch(args, '/clip/', {
        detalle: 'completo',
        limit: args.first,
        offset: args.offset || 0,
        tipo: args.genre,
        programa: args.serie,
        country_code: args.country,
        categoria: relation(args.category, args.categoryIsNull),
        corresponsal: relation(args.correspondent, args.correspondentIsNull),
        tema: relation(args.topic, args.topicIsNull)
      }).then(res => {
        res.json().catch(reject).then(clips => { resolve(clips.map(mapClip)) })
      }).catch(reject)
    })
  },
  clip: (_, { service, id }, ctx, { cacheControl }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/clip/${id}/`, { detalle: 'completo' }).catch(reject).then(res => {
        setCacheHintFromRes(res, cacheControl)
        res.json().then(clip => { resolve(mapClip(clip)) }).catch(() => { resolve(null) })
      })
    })
  },

  series: (_, args, ctx, { cacheControl }) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.offset || 0 }
      restFetch(args, `/programa/`, params).catch(reject).then(res => {
        setCacheHintFromRes(res, cacheControl)
        res.json().then(programas => { resolve(programas.map(mapSerie)) }).catch(reject)
      })
    })
  },
  serie: (_, { service, id }, ctx, { cacheControl }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/programa/${id}/`).catch(reject).then(res => {
        setCacheHintFromRes(res, cacheControl)
        res.json().then(programa => { resolve(mapSerie(programa)) }).catch(() => { resolve(null) })
      })
    })
  },

  genres: (_, args) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.offset || 0 }
      restFetch(args, `/tipo_clip/`, params).catch(reject).then(res => {
        res.json().then(tipos => { resolve(tipos.map(mapGenre)) }).catch(reject)
      })
    })
  },
  genre: (_, { service, id }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/tipo_clip/${id}/`).catch(reject).then(res => {
        res.json().then(tipo => { resolve(mapGenre(tipo)) }).catch(() => { resolve(null) })
      })
    })
  },

  categories: (_, args) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.offset || 0 }
      restFetch(args, `/categoria/`, params).catch(reject).then(res => {
        res.json().then(categorias => { resolve(categorias.map(mapCategory)) }).catch(reject)
      })
    })
  },
  category: (_, { service, id }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/categoria/${id}/`).catch(reject).then(res => {
        res.json().then(categoria => { resolve(mapCategory(categoria)) }).catch(() => { resolve(null) })
      })
    })
  },

  correspondents: (_, args) => {
    return new Promise((resolve, reject) => {
      const params = { pais: args.country, limit: args.first, offset: args.offset || 0 }
      restFetch(args, `/corresponsal/`, params).catch(reject).then(res => {
        res.json().then(corresponsales => { resolve(corresponsales.map(mapCorrespondent)) }).catch(reject)
      })
    })
  },
  correspondent: (_, { service, id }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/corresponsal/${id}/`).catch(reject).then(res => {
        res.json().then(categoria => { resolve(mapCorrespondent(categoria)) }).catch(() => { resolve(null) })
      })
    })
  },

  topics: (_, args) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.offset || 0 }
      restFetch(args, `/tema/`, params).catch(reject).then(res => {
        res.json().then(temas => { resolve(temas.map(mapTopic)) }).catch(reject)
      })
    })
  },
  topic: (_, { service, id }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/tema/${id}/`).catch(reject).then(res => {
        res.json().then(tema => { resolve(mapTopic(tema)) }).catch(() => { resolve(null) })
      })
    })
  }
}

const typeResolvers = {
  Service: {
    clips: ({ id }, args) => Query.clips(id, { service: id, ...args }),
    series: ({ id }, args) => Query.series(id, { service: id, ...args }),
    genres: ({ id }, args) => Query.genres(id, { service: id, ...args }),
    categories: ({ id }, args) => Query.categories(id, { service: id, ...args }),
  },

  Serie: {
    episodes: ({ id }, args) => Query.clips(id, { serie: id, genre: 'programa', ...args }),
  },

  Clip: {
    service: ({ idioma_original }) => services.find(s => s.language === idioma_original),
    genre: clip => clip.tipo && mapGenre(clip.tipo),
    serie: clip => clip.programa && mapSerie(clip.programa),
    category: clip => clip.categoria && mapCategory(clip.categoria),
    correspondent: clip => clip.corresponsal && mapCorrespondent(clip.corresponsal),
    topic: clip => clip.tema && mapTopic(clip.tema)
  },

  Genre: {
    clips: ({ id }, args) => Query.clips(id, { genre: id, ...args })
  },

  Category: {
    clips: ({ id }, args) => Query.clips(id, { category: id, ...args })
  },

  Correspondent: {
    clips: ({ id }, args) => Query.clips(id, { correspondent: id, ...args })
  },

  Topic: {
    clips: ({ id }, args) => Query.clips(id, { topic: id, ...args })
  },
}

module.exports = {
  Query,
  ...typeResolvers
}
