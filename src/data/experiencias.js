import { CATEGORIAS } from './cas.js'
import { ALBUMES, EXPERIENCIAS_CONTENIDO } from './contenido.js'
import medios from '../media/medios.json'

/**
 * Lee automáticamente TODAS las fotos y videos optimizados (generados desde
 * "actividad cas" por scripts/procesar-medios.mjs). Ningún nombre de archivo está
 * escrito a mano: la categoría, la experiencia y el álbum salen de la ruta.
 */
const urls = import.meta.glob('../media/**/*.{webp,mp4}', { eager: true, query: '?url', import: 'default' })

const ORDEN = Object.keys(CATEGORIAS)

export const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

function construir() {
  const mapa = new Map()

  for (const [ruta, url] of Object.entries(urls)) {
    if (/\.(thumb|poster)\.webp$/.test(ruta)) continue
    const rel = ruta.replace(/^\.\.\/media\//, '')
    const [categoria, carpeta, ...resto] = rel.split('/')
    if (!CATEGORIAS[categoria] || !resto.length) continue

    const archivo = resto.pop()
    const base = ruta.replace(/\.(webp|mp4)$/, '')
    const nombre = archivo.replace(/\.(webp|mp4)$/, '')
    const albumCarpeta = resto.join(' / ') || null
    const info = medios[rel] ?? {}
    const esVideo = archivo.endsWith('.mp4')

    const id = slug(`${categoria}-${carpeta}`)
    if (!mapa.has(id)) {
      mapa.set(id, { id, categoria, titulo: carpeta, ...normalizar(EXPERIENCIAS_CONTENIDO[carpeta]), medios: [] })
    }
    mapa.get(id).medios.push({
      id: `${id}/${albumCarpeta ?? ''}/${nombre}`,
      tipo: esVideo ? 'video' : 'foto',
      url,
      thumb: urls[`${base}.thumb.webp`] ?? url,
      poster: esVideo ? urls[`${base}.poster.webp`] : undefined,
      w: info.w ?? 4,
      h: info.h ?? 3,
      duracion: info.duracion ?? null,
      album: albumCarpeta ? (ALBUMES[albumCarpeta] ?? albumCarpeta) : null,
      nombre,
    })
  }

  const lista = [...mapa.values()]
  for (const e of lista) {
    e.medios.sort(
      (a, b) => (a.album ?? '').localeCompare(b.album ?? '', 'es') || a.nombre.localeCompare(b.nombre, 'es', { numeric: true }),
    )
    e.albumes = [...new Set(e.medios.map((m) => m.album).filter(Boolean))]
    e.fotos = e.medios.filter((m) => m.tipo === 'foto').length
    e.videos = e.medios.length - e.fotos
    e.portada =
      e.medios.find((m) => m.tipo === 'foto' && m.nombre === e.portadaNombre) ?? e.medios.find((m) => m.tipo === 'foto') ?? e.medios[0]
  }
  return lista.sort((a, b) => ORDEN.indexOf(a.categoria) - ORDEN.indexOf(b.categoria) || a.titulo.localeCompare(b.titulo, 'es'))
}

function normalizar(c = {}) {
  return {
    resumen: c.resumen ?? '',
    contexto: c.contexto ?? null,
    portadaNombre: c.portada ?? null,
    etapas: c.etapas ?? {},
    resultados: [...(c.resultados ?? [])].sort((a, b) => a.n - b.n),
  }
}

export const EXPERIENCIAS = construir()

/** Formatea la duración de un video (p. ej. 13.4 → "0:13"). */
export const duracion = (s) => (s == null ? '' : `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`)
