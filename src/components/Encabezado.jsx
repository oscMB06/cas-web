import { ESTUDIANTE } from '../data/cas.js'

export default function Encabezado() {
  return (
    <header className="sticky top-0 z-30 border-b border-linea bg-papel/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <a href="#inicio" className="min-w-0 truncate text-sm">
          <span className="font-medium">{ESTUDIANTE.nombre}</span>
          <span className="hidden text-gris sm:inline"> · Portafolio CAS</span>
        </a>
        <div className="flex shrink-0 items-center gap-5 text-sm text-gris">
          <a href="#experiencias" className="hover:text-tinta">Experiencias</a>
          <a href="#resultados" className="hover:text-tinta">
            <span className="hidden sm:inline">Resultados de aprendizaje</span>
            <span className="sm:hidden">Resultados</span>
          </a>
        </div>
      </nav>
    </header>
  )
}
