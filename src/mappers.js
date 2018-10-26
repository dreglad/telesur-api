const mapClip = (clip = {}) => ({
  ...clip,
  id: clip.slug,
  title: clip.titulo,
  description: clip.descripcion,
  date: clip.utc_date,
  image: clip.thumbnail_gigante,
  thumbnail: clip.thumbnail_grande,
  thumbnailSmall: clip.thumbnail_pequeno,
  thumbnails: clip.vtt_url,
  aspectRatio: clip.aspectratio,
  url: clip.navegador_url,
  hls: clip.hls_url,
  mp4: clip.archivo_url,
  duration: clip.duracion
})

const mapSerie = (programa = {}) => ({
  ...programa,
  id: programa.slug,
  name: programa.nombre,
  description: programa.descripcion,
  poster: programa.imagen_url
})

const mapGenre = (tipo = {}) => ({
  ...tipo,
  id: tipo.slug,
  name: tipo.nombre,
  plural: tipo.nombre_plural,
  description: tipo.descripcion,
  downloadable: tipo.descargable
})

const mapCategory = (categoria = {}) => ({
  ...categoria,
  id: categoria.slug,
  name: categoria.nombre,
  description: categoria.descripcion
})

module.exports = {
  mapClip,
  mapSerie,
  mapGenre,
  mapCategory
}
