import { Play } from 'lucide-react'
import { duracion } from '../data/experiencias.js'

/**
 * Foto o video en miniatura con sus proporciones naturales: el contenedor tiene
 * exactamente la proporción del archivo y no tiene fondo, así que nunca quedan
 * franjas a los lados.
 */
export default function Miniatura({ medio, alt = '', className = '', onClick }) {
  const esVideo = medio.tipo === 'video'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta ${className}`}
      aria-label={esVideo ? `Reproducir video ${medio.nombre}` : `Ampliar foto ${medio.nombre}`}
    >
      <img
        src={medio.thumb}
        alt={alt}
        width={medio.w}
        height={medio.h}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
      />
      {esVideo && (
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1.5 bg-tinta/80 px-2 py-1 text-[11px] font-medium text-white">
          <Play size={10} fill="currentColor" strokeWidth={0} />
          Video{medio.duracion ? ` · ${duracion(medio.duracion)}` : ''}
        </span>
      )}
    </button>
  )
}
