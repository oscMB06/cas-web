import { ESTUDIANTE } from '../data/cas.js'

export default function Pie() {
  return (
    <footer className="border-t border-linea">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-10 text-sm text-gris sm:flex-row sm:justify-between sm:px-6">
        <p>
          <span className="text-tinta">{ESTUDIANTE.nombre}</span> · {ESTUDIANTE.grado}
        </p>
        <p>
          {ESTUDIANTE.colegio} ({ESTUDIANTE.siglas})
        </p>
      </div>
    </footer>
  )
}
