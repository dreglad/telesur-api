const mapClip = clip => ({
  ...clip,
  id: clip.slug,
  title: clip.titulo,
  description: clip.descripcion,
  image: clip.thumbnail_gigante,
  thumbnail: clip.thumbnail_grande,
  thumbnailSmall: clip.thumbnail_pequeno
})

const mapSerie = programa => ({
  ...programa,
  id: programa.slug,
  name: programa.nombre,
  description: programa.descripcion,
  poster: programa.imagen_url
})

const mapClipType = tipo => ({
  ...tipo,
  id: tipo.slug,
  name: tipo.nombre,
  plural: tipo.nombre_plural,
  description: tipo.descripcion,
  downloadable: tipo.descargable
})

module.exports = {
  mapClip,
  mapSerie,
  mapClipType
}
