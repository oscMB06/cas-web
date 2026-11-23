export const ESTUDIANTE = {
  nombre: 'Oscar Orlando Maria Barranti',
  grado: '12.º A IB',
  colegio: 'Academia Bilingüe Panamá para el Futuro',
  siglas: 'ABPF',
}

/**
 * Las claves coinciden con las carpetas de "actividad cas".
 * El color solo se usa como marca discreta (punto, línea, número).
 */
export const CATEGORIAS = {
  Creatividad: {
    id: 'Creatividad',
    texto: 'text-creatividad',
    fondo: 'bg-creatividad',
    definicion: 'Exploración y ampliación de ideas que conducen a un producto o actuación original o interpretativo.',
  },
  Actividad: {
    id: 'Actividad',
    texto: 'text-actividad',
    fondo: 'bg-actividad',
    definicion: 'Esfuerzo físico que contribuye a un estilo de vida sano.',
  },
  Servicio: {
    id: 'Servicio',
    texto: 'text-servicio',
    fondo: 'bg-servicio',
    definicion: 'Compromiso colaborativo y recíproco con la comunidad en respuesta a una necesidad auténtica.',
  },
}

/** Los 7 Resultados de Aprendizaje de CAS del IB. */
export const RESULTADOS = [
  { n: 1, titulo: 'Fortalezas y áreas de crecimiento', texto: 'Identificar en sí mismo sus puntos fuertes y desarrollar áreas de crecimiento.' },
  { n: 2, titulo: 'Desafíos y nuevas habilidades', texto: 'Demostrar que ha afrontado desafíos, desarrollando nuevas habilidades en el proceso.' },
  { n: 3, titulo: 'Iniciativa y planificación', texto: 'Demostrar cómo iniciar y planificar una experiencia CAS.' },
  { n: 4, titulo: 'Compromiso y perseverancia', texto: 'Mostrar compromiso y perseverancia en las experiencias CAS.' },
  { n: 5, titulo: 'Trabajo colaborativo', texto: 'Demostrar las habilidades y reconocer los beneficios de trabajar en colaboración.' },
  { n: 6, titulo: 'Cuestiones de importancia global', texto: 'Demostrar compromiso con cuestiones de importancia global.' },
  { n: 7, titulo: 'Ética de las decisiones', texto: 'Reconocer y considerar la ética de las decisiones y acciones.' },
]

/** Etapas de CAS que se muestran en cada experiencia. */
export const ETAPAS = [
  { id: 'investigacion', titulo: 'Investigación' },
  { id: 'preparacion', titulo: 'Preparación' },
  { id: 'accion', titulo: 'Acción' },
  { id: 'reflexion', titulo: 'Reflexión' },
]
