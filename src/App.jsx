import { useCallback, useEffect, useState } from 'react'
import { EXPERIENCIAS } from './data/experiencias.js'
import Encabezado from './components/Encabezado.jsx'
import Inicio from './components/Inicio.jsx'
import Experiencias from './components/Experiencias.jsx'
import Detalle from './components/Detalle.jsx'
import Resultados from './components/Resultados.jsx'
import Pie from './components/Pie.jsx'

const desdeHash = () => {
  const id = decodeURIComponent(location.hash.replace(/^#exp=/, ''))
  return EXPERIENCIAS.find((e) => e.id === id) ?? null
}

export default function App() {
  const [filtro, setFiltro] = useState('Todas')
  const [abierta, setAbierta] = useState(desdeHash)

  // La experiencia abierta vive en la URL (#exp=...): se puede enlazar y el botón «atrás» la cierra.
  useEffect(() => {
    const alCambiar = () => setAbierta(desdeHash())
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  const abrir = useCallback((exp) => {
    location.hash = `exp=${exp.id}`
  }, [])

  const cerrar = useCallback(() => {
    history.replaceState(null, '', location.pathname + location.search)
    setAbierta(null)
  }, [])

  const verCategoria = (cat) => {
    setFiltro(cat)
    document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Encabezado />
      <main>
        <Inicio experiencias={EXPERIENCIAS} onCategoria={verCategoria} onAbrir={abrir} />
        <Experiencias experiencias={EXPERIENCIAS} filtro={filtro} setFiltro={setFiltro} onAbrir={abrir} />
        <Resultados experiencias={EXPERIENCIAS} onAbrir={abrir} />
      </main>
      <Pie />
      {abierta && <Detalle exp={abierta} experiencias={EXPERIENCIAS} onAbrir={abrir} onCerrar={cerrar} />}
    </>
  )
}
