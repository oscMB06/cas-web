/**
 * Prepara las fotos y videos de "actividad cas" para la web y los deja en "src/media"
 * con la misma estructura de carpetas (Categoría/Experiencia/[Álbum]/archivo).
 *
 * - Fotos (JPG, PNG, HEIC, CR2…)  → WebP completo (máx. 2000 px) + miniatura (máx. 700 px).
 * - Videos (MOV, MP4, M4V, WEBM)  → MP4 H.264 + AAC (máx. 1920 px, inicio rápido) + póster WebP.
 * - Escribe src/media/medios.json con el ancho, alto y duración de cada archivo.
 * - Elimina metadatos (incluida la ubicación GPS), ignora duplicados exactos
 *   y solo reprocesa lo nuevo o modificado.
 *
 * Se ejecuta solo antes de `npm run dev` y `npm run build` (o con `npm run media`).
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import heicConvert from 'heic-convert'
import ffmpeg from 'ffmpeg-static'

const run = promisify(execFile)
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ORIGEN = path.join(ROOT, 'actividad cas')
const DESTINO = path.join(ROOT, 'src', 'media')
const MANIFIESTO = path.join(DESTINO, 'medios.json')

const EXT_FOTO = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.cr2', '.tif', '.tiff', '.avif'])
const EXT_VIDEO = new Set(['.mov', '.mp4', '.m4v', '.webm'])
const FULL = 2000
const THUMB = 700

const posix = (p) => p.split(path.sep).join('/')

async function listar(dir) {
  const out = []
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await listar(p)))
    else out.push(p)
  }
  return out
}

/* ---------------------------------- Fotos --------------------------------- */

/** Extrae la vista previa JPEG a tamaño completo que Canon incrusta en los CR2. */
function jpegDesdeCR2(buf) {
  let orientacion = 1
  try {
    const le = buf.toString('ascii', 0, 2) === 'II'
    const u16 = (o) => (le ? buf.readUInt16LE(o) : buf.readUInt16BE(o))
    const u32 = (o) => (le ? buf.readUInt32LE(o) : buf.readUInt32BE(o))
    const ifd = u32(4)
    let off = 0
    let len = 0
    for (let i = 0; i < u16(ifd); i++) {
      const e = ifd + 2 + i * 12
      const tag = u16(e)
      if (tag === 0x0111) off = u32(e + 8)
      if (tag === 0x0117) len = u32(e + 8)
      if (tag === 0x0112) orientacion = u16(e + 8)
    }
    if (off && len && buf[off] === 0xff && buf[off + 1] === 0xd8) return { jpeg: buf.subarray(off, off + len), orientacion }
  } catch {
    /* se usa el método alternativo */
  }
  let mejor = null
  const soi = Buffer.from([0xff, 0xd8, 0xff])
  let i = buf.indexOf(soi)
  while (i !== -1) {
    const fin = buf.indexOf(Buffer.from([0xff, 0xd9]), i)
    if (fin === -1) break
    if (!mejor || fin - i > mejor.length) mejor = buf.subarray(i, fin + 2)
    i = buf.indexOf(soi, i + 3)
  }
  return { jpeg: mejor, orientacion }
}

const ROTACION = { 3: 180, 6: 90, 8: 270 }

async function decodificarFoto(archivo, buf) {
  const ext = path.extname(archivo).toLowerCase()
  if (ext === '.heic' || ext === '.heif') {
    const jpg = await heicConvert({ buffer: buf, format: 'JPEG', quality: 0.92 })
    return sharp(Buffer.from(jpg)).rotate().toBuffer()
  }
  if (ext === '.cr2') {
    const { jpeg, orientacion } = jpegDesdeCR2(buf)
    if (!jpeg) throw new Error('no se encontró la vista previa del CR2')
    return sharp(jpeg).rotate(ROTACION[orientacion] ?? 0).toBuffer()
  }
  return sharp(buf).rotate().toBuffer()
}

async function procesarFoto(archivo, buf, base) {
  const datos = await decodificarFoto(archivo, buf)
  await sharp(datos).resize({ width: FULL, height: FULL, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(`${base}.webp`)
  await sharp(datos).resize({ width: THUMB, height: THUMB, fit: 'inside', withoutEnlargement: true }).webp({ quality: 74 }).toFile(`${base}.thumb.webp`)
}

/* --------------------------------- Videos --------------------------------- */

async function procesarVideo(archivo, base) {
  // ffmpeg aplica la rotación del iPhone automáticamente; -map_metadata -1 quita GPS y fechas.
  await run(ffmpeg, [
    '-y', '-v', 'error', '-i', archivo,
    '-map', '0:v:0', '-map', '0:a:0?', '-map_metadata', '-1',
    '-vf', 'scale=w=min(iw\\,1920):h=min(ih\\,1920):force_original_aspect_ratio=decrease:force_divisible_by=2',
    '-fpsmax', '30',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '23', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
    `${base}.mp4`,
  ], { maxBuffer: 1 << 26 })
  const { stdout: png } = await run(
    ffmpeg,
    ['-v', 'error', '-ss', '0.3', '-i', `${base}.mp4`, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', '-'],
    { encoding: 'buffer', maxBuffer: 1 << 28 },
  )
  await sharp(png).webp({ quality: 80 }).toFile(`${base}.poster.webp`)
  await sharp(png).resize({ width: THUMB, height: THUMB, fit: 'inside' }).webp({ quality: 74 }).toFile(`${base}.thumb.webp`)
}

async function infoVideo(mp4) {
  // ffmpeg -i sin salida termina con error, pero imprime la información en stderr
  const { stderr } = await run(ffmpeg, ['-hide_banner', '-i', mp4]).catch((e) => e)
  const dur = /Duration: (\d+):(\d+):([\d.]+)/.exec(stderr)
  const dim = /Video:.*?, (\d{2,5})x(\d{2,5})/.exec(stderr)
  return {
    duracion: dur ? Math.round((+dur[1] * 3600 + +dur[2] * 60 + +dur[3]) * 10) / 10 : null,
    w: dim ? +dim[1] : null,
    h: dim ? +dim[2] : null,
  }
}

/* ---------------------------------- Main ---------------------------------- */

async function main() {
  try {
    await fs.access(ORIGEN)
  } catch {
    console.warn(`[media] No se encontró la carpeta "${ORIGEN}".`)
    return
  }

  const archivos = (await listar(ORIGEN)).sort()
  const esperados = new Set([MANIFIESTO])
  const usados = new Set()
  const hashes = new Set()
  const manifiesto = {}
  const cuenta = { fotos: 0, videos: 0, sinCambios: 0, duplicados: 0, errores: 0 }

  for (const archivo of archivos) {
    const ext = path.extname(archivo).toLowerCase()
    const esVideo = EXT_VIDEO.has(ext)
    if (!esVideo && !EXT_FOTO.has(ext)) continue
    const rel = path.relative(ORIGEN, archivo)
    if (rel.split(path.sep).length < 3) continue // debe estar dentro de Categoría/Experiencia/

    const buf = await fs.readFile(archivo)
    const hash = crypto.createHash('sha1').update(buf).digest('hex')
    if (hashes.has(hash)) {
      cuenta.duplicados++
      continue
    }
    hashes.add(hash)

    let base = path.join(DESTINO, path.dirname(rel), path.parse(rel).name.replace(/[()]/g, '_'))
    if (usados.has(base)) base += `_${ext.slice(1)}` // IMG_1.JPG e IMG_1.JPEG en la misma carpeta
    usados.add(base)

    const salidas = esVideo ? [`${base}.mp4`, `${base}.poster.webp`, `${base}.thumb.webp`] : [`${base}.webp`, `${base}.thumb.webp`]
    const { mtimeMs } = await fs.stat(archivo)
    let vigente = true
    for (const s of salidas) {
      try {
        if ((await fs.stat(s)).mtimeMs < mtimeMs) vigente = false
      } catch {
        vigente = false
      }
    }

    try {
      if (!vigente) {
        await fs.mkdir(path.dirname(base), { recursive: true })
        if (esVideo) await procesarVideo(archivo, base)
        else await procesarFoto(archivo, buf, base)
        cuenta[esVideo ? 'videos' : 'fotos']++
        console.log(`[media] ✓ ${posix(rel)}`)
      } else cuenta.sinCambios++

      salidas.forEach((s) => esperados.add(s))
      const clave = posix(path.relative(DESTINO, salidas[0]))
      if (esVideo) manifiesto[clave] = { tipo: 'video', ...(await infoVideo(salidas[0])) }
      else {
        const { width, height } = await sharp(salidas[0]).metadata()
        manifiesto[clave] = { tipo: 'foto', w: width, h: height }
      }
    } catch (err) {
      cuenta.errores++
      console.warn(`[media] ✗ ${posix(rel)}: ${err.message}`)
    }
  }

  await fs.mkdir(DESTINO, { recursive: true })
  await fs.writeFile(MANIFIESTO, JSON.stringify(manifiesto, null, 1))

  // Borra versiones de archivos que ya no existen en "actividad cas"
  let eliminados = 0
  for (const p of await listar(DESTINO)) {
    if (!esperados.has(p)) {
      await fs.unlink(p)
      eliminados++
    }
  }

  console.log(
    `[media] Listo: ${cuenta.fotos} fotos y ${cuenta.videos} videos nuevos, ${cuenta.sinCambios} sin cambios, ` +
      `${cuenta.duplicados} duplicados ignorados` +
      (eliminados ? `, ${eliminados} archivos obsoletos eliminados` : '') +
      (cuenta.errores ? `, ${cuenta.errores} con error` : ''),
  )
}

main()
