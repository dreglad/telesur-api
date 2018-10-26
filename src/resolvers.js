const { toQueryString } = require('./utils')
const { mapClip, mapSerie, mapClipType } = require('./mappers')
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

const resolvers = {
  Query: {
    services: () => services,

    clips: (_, args) => {
      return new Promise((resolve, reject) => {
        restFetch(args, '/clip/', {
          detalle: 'completo',
          limit: args.first || 10,
          offset: args.offset || 0,
          slug: args.id,
          tipo: args.clipType
        }).then(res => {
          res.json().catch(reject).then(clips => { resolve(clips.map(mapClip)) })
        }).catch(reject)
      })
    },

    clip: (_, { service, id }) => {
      return new Promise((resolve, reject) => {
        restFetch({ service }, `/clip/${id}/`, { detalle: 'completo' }).catch(reject).then(res => {
          res.json()
            .then(clip => { resolve(mapClip(clip)) })
            .catch(() => { resolve(null) })
        })
      })
    },

    series: (_, args) => {
      return new Promise((resolve, reject) => {
        fetch(`${getURL(args.service)}/programa/`).then(res => {
          res.json().then(programas => { resolve(programas.map(mapSerie)) }).catch(reject)
        })
      })
    },

    serie: (_, { service, id }) => {
      return new Promise((resolve, reject) => {
        fetch(`${getURL(service)}/programa/${id}/`).catch(reject).then(res => {
          res.json()
            .then(programa => { resolve(mapSerie(programa)) })
            .catch(() => { resolve(null) })
        })
      })
    },

    clipTypes: (_, args) => {
      return new Promise((resolve, reject) => {
        fetch(`${getURL(args.service)}/tipo_clip/`).then(res => {
          res.json().then(tipos => { resolve(tipos.map(mapClipType)) }).catch(reject)
        })
      })
    },

    clipType: (_, { service, id }) => {
      return new Promise((resolve, reject) => {
        fetch(`${getURL(service)}/tipo_clip/${id}/`).catch(reject).then(res => {
          res.json()
            .then(tipo => { resolve(mapClipType(tipo)) })
            .catch(() => { resolve(null) })
        })
      })
    }
  },

  Clip: {
    clipType: ({ tipo }) => ({
      id: tipo.slug,
      name: tipo.nombre
    }),
    service: ({ idioma_original }) => {
      return services.find(service => service.language === idioma_original)
    }
  }
}

module.exports = resolvers
