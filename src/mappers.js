const mapClip = clip => ({
  ...clip,
  id: clip.slug,
  title: clip.titulo,
  description: clip.descripcion,
  service: clip.idioma_original === 'en' ? 'telesur-en' : 'telesur'
})

const mapSerie = programa => ({
  ...programa,
  id: programa.slug,
  name: programa.nombre,
  description: programa.descripcion,
  poster: programa.imagen_url
})

module.exports = { mapClip, mapSerie }