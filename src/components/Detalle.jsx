import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { CATEGORIAS, ETAPAS, RESULTADOS } from '../data/cas.js'
import Miniatura from './Miniatura.jsx'
import Visor from './Visor.jsx'

export default function Detalle({ exp, experiencias, onAbrir, onCerrar }) {
  const c = CATEGORIAS[exp.categoria]
  const [indice, setIndice] = useState(null)
  const panel = useRef(null)

  const pos = experiencias.indexOf(exp)
  const anterior = experiencias[(pos - 1 + experiencias.length) % experiencias.length]
  const siguiente = experiencias[(pos + 1) % experiencias.length]

  // Bloquea el scroll de la página de fondo
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Al cambiar de experiencia: volver arriba y cerrar el visor
  useEffect(() => {
    panel.current?.scrollTo(0, 0)
    setIndice(null)
  }, [exp.id])

  useEffect(() => {
    const tecla = (e) => e.key === 'Escape' && indice === null && onCerrar()
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [indice, onCerrar])

  const grupos = exp.albumes.length
    ? [
        ...exp.albumes.map((a) => ({ album: a, medios: exp.medios.filter((m) => m.album === a) })),
        ...(exp.medios.some((m) => !m.album) ? [{ album: 'Otras', medios: exp.medios.filter((m) => !m.album) }] : []),
      ]
    : [{ album: null, medios: exp.medios }]

  const etapas = ETAPAS.filter((et) => exp.etapas[et.id])
  const portada = exp.portada

  return (
    <div ref={panel} className="fixed inset-0 z-40 overflow-y-auto bg-white" role="dialog" aria-modal="true" aria-label={exp.titulo}>
      {/* Barra superior */}
      <div className="sticky top-0 z-10 border-b border-linea bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <button onClick={onCerrar} className="flex items-center gap-2 text-sm text-gris hover:text-tinta">
            <ArrowLeft size={16} /> Volver al portafolio
          </button>
          <button onClick={onCerrar} aria-label="Cerrar" className="p-1 text-gris hover:text-tinta">
            <X size={20} />
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
        {/* Cabecera */}
        <header className="max-w-3xl">
          <p className="flex items-center gap-2 text-sm">
            <span className={`h-2 w-2 rounded-full ${c.fondo}`} />
            <span className={c.texto}>{exp.categoria}</span>
            {exp.contexto && <span className="text-gris">· {exp.contexto}</span>}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight font-medium tracking-tight sm:text-6xl">{exp.titulo}</h1>
          {exp.resumen && <p className="mt-6 font-serif text-xl leading-relaxed text-tinta/85">{exp.resumen}</p>}
        </header>

        {/* Imagen principal: el contenedor toma el tamaño exacto de la imagen (sin franjas a los lados) */}
        {portada && (
          <figure className="mt-12 w-fit max-w-full">
            <button
              onClick={() => setIndice(exp.medios.indexOf(portada))}
              className="block max-w-full"
              aria-label="Ampliar imagen principal"
            >
              <img
                src={portada.tipo === 'video' ? portada.poster : portada.url}
                alt={exp.titulo}
                width={portada.w}
                height={portada.h}
                className="block h-auto max-h-[78vh] w-auto max-w-full"
              />
            </button>
            <figcaption className="mt-3 text-sm text-gris">
              {exp.titulo}
              {portada.album ? ` — ${portada.album}` : ''}. {exp.fotos} {exp.fotos === 1 ? 'fotografía' : 'fotografías'}
              {exp.videos > 0 && ` y ${exp.videos} ${exp.videos === 1 ? 'video' : 'videos'}`} en la galería.
            </figcaption>
          </figure>
        )}

        {/* Reflexión CAS */}
        {etapas.length > 0 && (
          <section className="mt-20">
            <h2 className="rotulo">Reflexión CAS</h2>
            <dl className="mt-6">
              {etapas.map((et, i) => (
                <div key={et.id} className="grid gap-3 border-t border-linea py-8 md:grid-cols-[14rem_1fr] md:gap-10">
                  <dt className="flex items-baseline gap-3 font-serif text-2xl">
                    <span className="text-sm text-gris tabular-nums">{i + 1}.</span>
                    {et.titulo}
                  </dt>
                  <dd className="max-w-2xl text-[17px] leading-[1.75] text-tinta/90">{exp.etapas[et.id]}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Resultados de aprendizaje */}
        {exp.resultados.length > 0 && (
          <section className="mt-12">
            <h2 className="rotulo">Resultados de aprendizaje del IB</h2>
            <ul className="mt-6 border-t border-linea">
              {exp.resultados.map((r) => {
                const ra = RESULTADOS.find((x) => x.n === r.n)
                return (
                  <li key={r.n} className="grid gap-2 border-b border-linea py-5 md:grid-cols-[14rem_1fr] md:gap-10">
                    <p className="flex items-baseline gap-3">
                      <span className="font-serif text-2xl tabular-nums">RA{r.n}</span>
                      <span className="text-sm text-gris">{ra?.titulo}</span>
                    </p>
                    <p className="max-w-2xl leading-relaxed text-tinta/90">{r.evidencia}</p>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        {/* Galería */}
        <section className="mt-20">
          <div className="flex items-baseline justify-between border-b border-linea pb-3">
            <h2 className="rotulo">Galería</h2>
            <p className="text-sm text-gris">
              {exp.fotos} {exp.fotos === 1 ? 'foto' : 'fotos'}
              {exp.videos > 0 && ` · ${exp.videos} ${exp.videos === 1 ? 'video' : 'videos'}`}
            </p>
          </div>
          <div className="mt-8 space-y-14">
            {grupos.map((g) => (
              <div key={g.album ?? 'todas'}>
                {g.album && (
                  <h3 className="mb-5 font-serif text-2xl">
                    {g.album} <span className="text-base text-gris">· {g.medios.length}</span>
                  </h3>
                )}
                <div className="columns-2 gap-3 sm:columns-3 lg:columns-4">
                  {g.medios.map((m) => (
                    <Miniatura
                      key={m.id}
                      medio={m}
                      className="mb-3 break-inside-avoid"
                      onClick={() => setIndice(exp.medios.indexOf(m))}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Navegación entre experiencias */}
        <nav className="mt-20 grid grid-cols-2 border-t border-linea pt-6 text-sm">
          <button onClick={() => onAbrir(anterior)} className="group text-left">
            <span className="flex items-center gap-1.5 text-gris">
              <ArrowLeft size={14} /> Anterior
            </span>
            <span className="mt-1 block pr-4 font-serif text-lg group-hover:underline">{anterior.titulo}</span>
          </button>
          <button onClick={() => onAbrir(siguiente)} className="group text-right">
            <span className="flex items-center justify-end gap-1.5 text-gris">
              Siguiente <ArrowRight size={14} />
            </span>
            <span className="mt-1 block pl-4 font-serif text-lg group-hover:underline">{siguiente.titulo}</span>
          </button>
        </nav>
      </article>

      {indice !== null && (
        <Visor medios={exp.medios} titulo={exp.titulo} indice={indice} setIndice={setIndice} onCerrar={() => setIndice(null)} />
      )}
    </div>
  )
}
