import { CATEGORIAS, ESTUDIANTE } from '../data/cas.js'
import { INTRODUCCION } from '../data/contenido.js'

export default function Inicio({ experiencias, onCategoria, onAbrir }) {
  const fotos = experiencias.reduce((n, e) => n + e.fotos, 0)
  const videos = experiencias.reduce((n, e) => n + e.videos, 0)
  const resultados = new Set(experiencias.flatMap((e) => e.resultados.map((r) => r.n)))

  // Una portada de cada categoría, alternadas, para la franja de imágenes
  const porCategoria = Object.keys(CATEGORIAS).map((c) => experiencias.filter((e) => e.categoria === c))
  const franja = []
  for (let i = 0; franja.length < 6 && i < 12; i++) {
    for (const lista of porCategoria) if (lista[i] && franja.length < 6) franja.push(lista[i])
  }

  const cifras = [
    [experiencias.length, 'experiencias'],
    [fotos, 'fotografías'],
    [videos, 'videos'],
    [`${resultados.size} de 7`, 'resultados de aprendizaje'],
  ]

  return (
    <section id="inicio" className="scroll-mt-14">
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-14 sm:px-6 sm:pt-24">
        <p className="rotulo">Portafolio CAS · Programa del Diploma del IB</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.02] font-medium tracking-tight sm:text-7xl">
          {ESTUDIANTE.nombre}
        </h1>
        <p className="mt-5 text-lg text-gris">
          {ESTUDIANTE.grado} · {ESTUDIANTE.colegio} ({ESTUDIANTE.siglas})
        </p>

        <div className="mt-12 grid gap-10 border-t border-linea pt-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl space-y-4 font-serif text-xl leading-relaxed">
            {INTRODUCCION.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="grid grid-cols-2 gap-px self-start border border-linea bg-linea">
            {cifras.map(([valor, etiqueta]) => (
              <div key={etiqueta} className="bg-papel p-5">
                <dt className="font-serif text-4xl">{valor}</dt>
                <dd className="mt-1 text-sm text-gris">{etiqueta}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Franja de imágenes con proporciones naturales */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-44 gap-2 overflow-hidden sm:h-56">
          {franja.map((e) => (
            <button
              key={e.id}
              onClick={() => onAbrir(e)}
              className="h-full shrink-0 overflow-hidden"
              style={{ aspectRatio: `${e.portada.w} / ${e.portada.h}` }}
              aria-label={e.titulo}
            >
              <img src={e.portada.thumb} alt="" className="h-full w-full object-cover transition-opacity hover:opacity-85" />
            </button>
          ))}
        </div>
      </div>

      {/* Resumen por categoría */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid border-t border-linea md:grid-cols-3">
          {Object.values(CATEGORIAS).map((c, i) => {
            const exps = experiencias.filter((e) => e.categoria === c.id)
            return (
              <div key={c.id} className={`border-b border-linea py-8 md:border-b-0 ${i ? 'md:border-l md:pl-8' : ''} md:pr-8`}>
                <div className="flex items-baseline justify-between">
                  <h2 className="flex items-center gap-2.5 font-serif text-2xl">
                    <span className={`h-2 w-2 rounded-full ${c.fondo}`} />
                    {c.id}
                  </h2>
                  <span className="text-sm text-gris">
                    {exps.length} {exps.length === 1 ? 'experiencia' : 'experiencias'}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gris">{c.definicion}</p>
                <ul className="mt-5 space-y-2 text-[15px]">
                  {exps.map((e) => (
                    <li key={e.id}>
                      <button onClick={() => onAbrir(e)} className="text-left underline-offset-4 hover:underline">
                        {e.titulo}
                      </button>
                    </li>
                  ))}
                </ul>
                <button onClick={() => onCategoria(c.id)} className="mt-5 text-sm text-gris underline-offset-4 hover:text-tinta hover:underline">
                  Ver solo {c.id.toLowerCase()} →
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
