const reducers = {
  clip: (clip = {}) => ({
    ...clip,
    slug: clip.slug,
    tipo_clip: clip.tipo,
    title: clip.titulo,
    description: clip.descripcion,
    published: typeof clip.publicado === 'boolean' ? clip.publicado : true,
    date: clip.utc_date,
    image: clip.thumbnail_gigante,
    thumbnail: clip.thumbnail_grande,
    thumbnailSmall: clip.thumbnail_pequeno,
    thumbnails: clip.vtt_url,
    aspectRatio: clip.aspectratio,
    country: clip.country_code,
    url: clip.navegador_url,
    hls: clip.hls_url,
    mp4: clip.archivo_url,
    duration: clip.duracion
  }),

  programa: (programa = {}) => ({
    ...programa,
    name: programa.nombre,
    description: programa.descripcion,
    poster: programa.imagen_url
  }),

  tipo_clip: (tipo = {}) => ({
    ...tipo,
    name: tipo.nombre,
    plural: tipo.nombre_plural,
    description: tipo.descripcion,
    downloadable: tipo.descargable
  }),

  categoria: (categoria = {}) => ({
    ...categoria,
    name: categoria.nombre,
    description: categoria.descripcion
  }),

  corresponsal: (corresponsal = {}) => ({
    ...corresponsal,
    name: corresponsal.nombre,
    description: corresponsal.descripcion,
    twitter: corresponsal.twitter,
    country: corresponsal.pais && corresponsal.pais.codigo
  }),

  tema: (tema = {}) => ({
    ...tema,
    name: tema.nombre,
    description: tema.descripcion
  })
}

module.exports = reducers;
