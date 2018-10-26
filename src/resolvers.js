const { toQueryString } = require('./utils')
const { mapClip, mapSerie, mapGenre, mapCategory } = require('./mappers')
const fetch = require('node-fetch')

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
    url: 'https://videosenglish.telesurtv.net/',
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
    return new Promise((resolve, reject) => {
      restFetch(args, '/clip/', {
        detalle: 'completo',
        limit: args.first,
        offset: args.offset || 0,
        tipo: args.genre,
        programa: args.serie,
        categoria: args.category
      }).then(res => {
        res.json().catch(reject).then(clips => { resolve(clips.map(mapClip)) })
      }).catch(reject)
    })
  },
  clip: (_, { service, id }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/clip/${id}/`, { detalle: 'completo' }).catch(reject).then(res => {
        res.json().then(clip => { resolve(mapClip(clip)) }).catch(() => { resolve(null) })
      })
    })
  },
  series: (_, args) => {
    return new Promise((resolve, reject) => {
      const params = { limit: args.first, offset: args.offset || 0 }
      restFetch(args, `/programa/`, params).catch(reject).then(res => {
        res.json().then(programas => { resolve(programas.map(mapSerie)) }).catch(reject)
      })
    })
  },
  serie: (_, { service, id }) => {
    return new Promise((resolve, reject) => {
      restFetch({ service }, `/programa/${id}/`).catch(reject).then(res => {
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
  }
}

const typeResolvers = {
  Service: {
    clips: (service, args) => Query.clips(service, { service: service.id, ...args }),
    series: (service, args) => Query.series(service, { service: service.id, ...args }),
    genres: (service, args) => Query.genres(service, { service: service.id, ...args }),
    categories: (service, args) => Query.categories(service, { service: service.id, ...args }),
  },

  Clip: {
    service: ({ idioma_original }) => services.find(s => s.language === idioma_original),
    genre: clip => mapGenre(clip),
    serie: clip => mapSerie(clip)
  },

  Genre: {
    clips: ({ id }, args) => Query.clips(id, { genre: id, ...args })
  },

  Category: {
    clips: ({ id }, args) => Query.clips(id, { category: id, ...args })
  }
}

module.exports = {
  Query,
  ...typeResolvers
}
