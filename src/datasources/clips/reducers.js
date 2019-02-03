const reducers = {
  clip: (clip = {}) => ({
    ...clip,
    slug: clip.slug,
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
    tags: clip.original_tags || [],
    hashtags: (clip.hashtags || '').split(',').map(tag => tag.trim()),
    duration: clip.duracion,
    youtubeId: clip.youtube_id,
    uploadYoutube: clip.publicado_yt || false,
    country: clip.pais && clip.pais.codigo,
    city: clip.ciudad,
    highlighted: clip.seleccionado
  }),

  programa: (programa = {}) => ({
    ...programa,
    name: programa.nombre,
    description: programa.descripcion,
    poster: programa.imagen_url
  }),

  tipo: (tipo = {}) => ({
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
