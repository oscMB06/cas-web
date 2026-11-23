import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { duracion } from '../data/experiencias.js'

/** Visor a pantalla completa para fotos y videos, sobre fondo oscuro neutro. */
export default function Visor({ medios, titulo, indice, setIndice, onCerrar }) {
  const medio = medios[indice]
  const toque = useRef(null)
  const varios = medios.length > 1

  const ir = (d) => setIndice((indice + d + medios.length) % medios.length)

  useEffect(() => {
    const tecla = (e) => {
      if (e.key === 'ArrowRight' && varios) ir(1)
      else if (e.key === 'ArrowLeft' && varios) ir(-1)
      else if (e.key === 'Escape') onCerrar()
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  })

  // Precarga la foto siguiente para que la navegación sea inmediata
  useEffect(() => {
    const sig = medios[(indice + 1) % medios.length]
    if (sig?.tipo === 'foto') new Image().src = sig.url
  }, [indice, medios])

  if (!medio) return null
  const detener = (e) => e.stopPropagation()

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-visor text-white/90"
      onClick={onCerrar}
      onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (toque.current === null || !varios) return
        const dx = e.changedTouches[0].clientX - toque.current
        if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1)
        toque.current = null
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm sm:px-6" onClick={detener}>
        <p className="min-w-0 truncate text-white/60">
          <span className="text-white/90">{titulo}</span>
          {medio.album && <span> — {medio.album}</span>}
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <span className="text-white/60 tabular-nums">
            {indice + 1} / {medios.length}
          </span>
          <button onClick={onCerrar} aria-label="Cerrar visor" className="p-1 text-white/70 hover:text-white">
            <X size={22} />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-20">
        {medio.tipo === 'video' ? (
          <video
            key={medio.id}
            src={medio.url}
            poster={medio.poster}
            controls
            autoPlay
            playsInline
            onClick={detener}
            width={medio.w}
            height={medio.h}
            className="block h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-10rem)]"
          />
        ) : (
          <img
            key={medio.id}
            src={medio.url}
            alt={medio.nombre}
            onClick={detener}
            width={medio.w}
            height={medio.h}
            className="block h-auto max-h-[calc(100dvh-7rem)] w-auto max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-10rem)]"
          />
        )}

        {varios && (
          <>
            <button
              onClick={(e) => {
                detener(e)
                ir(-1)
              }}
              aria-label="Anterior"
              className="absolute left-1 p-3 text-white/60 hover:text-white sm:left-4"
            >
              <ChevronLeft size={32} strokeWidth={1.5} />
            </button>
            <button
              onClick={(e) => {
                detener(e)
                ir(1)
              }}
              aria-label="Siguiente"
              className="absolute right-1 p-3 text-white/60 hover:text-white sm:right-4"
            >
              <ChevronRight size={32} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      <p className="px-4 pb-4 text-center text-xs text-white/45" onClick={detener}>
        {medio.tipo === 'video' ? `Video${medio.duracion ? ` · ${duracion(medio.duracion)}` : ''}` : 'Fotografía'} · {medio.nombre}
      </p>
    </div>
  )
}
