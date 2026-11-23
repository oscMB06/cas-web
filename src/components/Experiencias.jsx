import { CATEGORIAS } from '../data/cas.js'

const FILTROS = ['Todas', ...Object.keys(CATEGORIAS)]

export default function Experiencias({ experiencias, filtro, setFiltro, onAbrir }) {
  const visibles = filtro === 'Todas' ? experiencias : experiencias.filter((e) => e.categoria === filtro)

  return (
    <section id="experiencias" className="scroll-mt-14 border-t border-linea bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="rotulo">Experiencias</p>
            <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">Registro de experiencias</h2>
          </div>

          <div role="tablist" aria-label="Filtrar por categoría" className="flex flex-wrap gap-x-6 gap-y-2 border-b border-linea">
            {FILTROS.map((f) => {
              const n = f === 'Todas' ? experiencias.length : experiencias.filter((e) => e.categoria === f).length
              const activo = filtro === f
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={activo}
                  onClick={() => setFiltro(f)}
                  className={`-mb-px flex items-center gap-2 border-b-2 pb-2.5 text-sm transition-colors ${
                    activo ? 'border-tinta text-tinta' : 'border-transparent text-gris hover:text-tinta'
                  }`}
                >
                  {CATEGORIAS[f] && <span className={`h-1.5 w-1.5 rounded-full ${CATEGORIAS[f].fondo}`} />}
                  {f}
                  <span className="text-xs text-gris tabular-nums">{n}</span>
                </button>
              )
            })}
          </div>
        </div>

        <ol className="mt-12 grid items-start gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((e) => (
            <li key={e.id}>
              <Entrada exp={e} numero={experiencias.indexOf(e) + 1} onAbrir={() => onAbrir(e)} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Entrada({ exp, numero, onAbrir }) {
  const c = CATEGORIAS[exp.categoria]
  return (
    <article>
      <button onClick={onAbrir} className="group block w-full text-left">
        {exp.portada && (
          <img
            src={exp.portada.tipo === 'video' ? exp.portada.poster : exp.portada.thumb}
            alt={exp.titulo}
            width={exp.portada.w}
            height={exp.portada.h}
            loading="lazy"
            className="block h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
          />
        )}
        <div className="mt-4 flex items-center justify-between text-xs text-gris">
          <span className="flex items-center gap-2">
            <span className="tabular-nums">{String(numero).padStart(2, '0')}</span>
            <span className={`h-1.5 w-1.5 rounded-full ${c.fondo}`} />
            <span className={c.texto}>{exp.categoria}</span>
          </span>
          <span>
            {exp.fotos} {exp.fotos === 1 ? 'foto' : 'fotos'}
            {exp.videos > 0 && ` · ${exp.videos} ${exp.videos === 1 ? 'video' : 'videos'}`}
          </span>
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-snug decoration-1 underline-offset-4 group-hover:underline">
          {exp.titulo}
        </h3>
        {exp.contexto && <p className="mt-1 text-sm text-gris">{exp.contexto}</p>}
        <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed text-tinta/80">{exp.resumen}</p>
      </button>
    </article>
  )
}
