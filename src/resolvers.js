const { toQueryString } = require('./utils')
const { mapClip, mapSerie } = require('./mappers')
const fetch = require('node-fetch')

const baseURL = `https://multimedia.telesurtv.net`
const getURL = service => service === 'telesur-en' ? `${baseURL}/en/api`: `${baseURL}/api`

const resolvers = {
  Query: {
    clips: (_, args) => {
      const qs = toQueryString({
        detalle: 'completo',
        limit: args.first || 10,
        offset: args.offset || 0,
        slug: args.id,
        tipo: args.clipType
      })
      return new Promise((resolve, reject) => {
        fetch(`${getURL(args.service)}/clip/?${qs}`).catch(reject).then(res => {
          res.json().then(clips => { resolve(clips.map(mapClip)) }).catch(reject)
        })
      })
    },

    clip: (_, { id }) => {
      return new Promise((resolve, reject) => {
        fetch(`${getURL()}/clip/${id}/?detalle=completo`).catch(reject).then(res => {
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

    serie: (_, { id }) => {
      return new Promise((resolve, reject) => {
        fetch(`${getURL()}/programa/${id}/`).catch(reject).then(res => {
          res.json()
            .then(programa => { resolve(mapSerie(programa)) })
            .catch(() => { resolve(null) })
        })
      })
    }
  },

  Clip: {
    clipType: ({ tipo }) => ({
      id: tipo.slug,
      name: tipo.nombre
    })
  }
}

module.exports = resolvers
