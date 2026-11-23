import { CATEGORIAS, RESULTADOS } from '../data/cas.js'

export default function Resultados({ experiencias, onAbrir }) {
  const vinculos = RESULTADOS.map((r) => ({
    ...r,
    exps: experiencias
      .map((e) => ({ exp: e, evidencia: e.resultados.find((x) => x.n === r.n)?.evidencia }))
      .filter((x) => x.evidencia),
  }))

  return (
    <section id="resultados" className="scroll-mt-14 border-t border-linea">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="rotulo">Resultados de aprendizaje</p>
        <h2 className="mt-3 font-serif text-4xl font-medium tracking-tight sm:text-5xl">Los 7 resultados de CAS</h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-gris">
          Cada resultado de aprendizaje del IB aparece con las experiencias que lo evidencian. La matriz final resume la
          relación entre todas las experiencias y los siete resultados.
        </p>

        <ol className="mt-12 border-t border-linea">
          {vinculos.map((r) => (
            <li key={r.n} className="grid gap-4 border-b border-linea py-8 md:grid-cols-[5rem_1fr_1.3fr] md:gap-8">
              <span className="font-serif text-5xl leading-none text-tinta/25 tabular-nums">{r.n}</span>
              <div>
                <h3 className="font-serif text-2xl leading-snug">{r.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gris">{r.texto}</p>
              </div>
              <ul className="space-y-3">
                {r.exps.map(({ exp, evidencia }) => (
                  <li key={exp.id} className="text-[15px] leading-snug">
                    <button onClick={() => onAbrir(exp)} className="group flex items-start gap-2.5 text-left">
                      <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full ${CATEGORIAS[exp.categoria].fondo}`} />
                      <span>
                        <span className="font-medium underline-offset-4 group-hover:underline">{exp.titulo}</span>
                        <span className="mt-0.5 block text-sm text-gris">{evidencia}</span>
                      </span>
                    </button>
                  </li>
                ))}
                {!r.exps.length && <li className="text-sm text-gris">Sin experiencias vinculadas.</li>}
              </ul>
            </li>
          ))}
        </ol>

        {/* Matriz experiencias × resultados */}
        <div className="mt-20">
          <h3 className="rotulo">Matriz de resultados</h3>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-tinta/80 text-left">
                  <th className="py-3 pr-4 font-medium">Experiencia</th>
                  {RESULTADOS.map((r) => (
                    <th key={r.n} className="w-14 py-3 text-center font-medium tabular-nums" title={r.titulo}>
                      RA{r.n}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {experiencias.map((e) => (
                  <tr key={e.id} className="border-b border-linea">
                    <td className="py-2.5 pr-4">
                      <button onClick={() => onAbrir(e)} className="flex items-center gap-2.5 text-left hover:underline">
                        <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${CATEGORIAS[e.categoria].fondo}`} />
                        {e.titulo}
                      </button>
                    </td>
                    {RESULTADOS.map((r) => {
                      const si = e.resultados.some((x) => x.n === r.n)
                      return (
                        <td key={r.n} className="text-center" aria-label={si ? `RA${r.n}: sí` : `RA${r.n}: no`}>
                          {si ? <span className="inline-block h-2.5 w-2.5 rounded-full bg-tinta" /> : <span className="text-linea">—</span>}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="text-gris">
                  <td className="py-3 pr-4">Total de experiencias</td>
                  {vinculos.map((r) => (
                    <td key={r.n} className="py-3 text-center tabular-nums">
                      {r.exps.length}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
