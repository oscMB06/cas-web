/**
 * CONTENIDO DEL PORTAFOLIO CAS
 * ----------------------------------------------------------------------------
 * Aquí están todos los textos que se muestran en la web. Para corregir o afinar
 * algo, edita este archivo y guarda: la página se actualiza sola.
 *
 * Cada clave es el nombre EXACTO de la carpeta de la experiencia dentro de
 * "actividad cas/<Categoría>/". Campos:
 *   - resumen:     una o dos frases que describen la experiencia.
 *   - contexto:    dato breve que aparece bajo el título (duración, fase, etc.). Opcional.
 *   - portada:     nombre del archivo (sin extensión) que se usará como foto principal. Opcional.
 *   - etapas:      reflexión según las cinco etapas de CAS (se muestran las cuatro pedidas).
 *   - resultados:  Resultados de Aprendizaje del IB (1–7) con la evidencia de cada uno.
 */

export const INTRODUCCION = [
  'Este portafolio documenta mis experiencias de Creatividad, Actividad y Servicio durante el Programa del Diploma. Las organicé tal como las viví: caminatas que me exigieron físicamente, proyectos en los que la fotografía y la tecnología fueron mi forma de crear, y jornadas en las que trabajé para otros.',
  'Cada experiencia reúne las fotografías y videos que tomé o en los que aparezco, una reflexión organizada según las etapas de CAS y los resultados de aprendizaje que considero haber demostrado.',
]

export const EXPERIENCIAS_CONTENIDO = {
  /* ================================ ACTIVIDAD ================================ */

  'India Dormida': {
    resumen:
      'Caminata con amigos hasta la cima del cerro La India Dormida, en El Valle de Antón, por un sendero empinado de roca y pasto.',
    portada: 'IMG_2422',
    etapas: {
      investigacion:
        'Quería una actividad física que no fuera repetir el mismo ejercicio de siempre. La India Dormida es una de las caminatas más conocidas de El Valle y varios amigos ya querían hacerla, así que la propuse como salida de grupo.',
      preparacion:
        'Revisamos el recorrido y el estado del sendero, acordamos la hora de salida y llevamos agua, ropa cómoda y zapatos con buen agarre. También acordamos no separarnos en los tramos más inclinados.',
      accion:
        'Subimos por un sendero de pendiente fuerte, con partes de roca suelta y pasto donde había que apoyarse con las manos. Hicimos pausas cortas para recuperar el aliento y llegamos a la cima, donde nos quedamos a observar la vista del valle.',
      reflexion:
        'La subida me costó más de lo que esperaba y en algunos tramos tuve que bajar el ritmo. Aprendí a medir mi energía en lugar de querer ir rápido desde el principio. También noté que el grupo avanzó mejor cuando nos esperábamos unos a otros. La próxima vez entrenaría resistencia unas semanas antes.',
    },
    resultados: [
      { n: 1, evidencia: 'Reconocí que mi resistencia en pendientes es un área por mejorar y ajusté el ritmo en consecuencia.' },
      { n: 2, evidencia: 'Completé una subida exigente por terreno irregular, algo que no había hecho antes.' },
      { n: 4, evidencia: 'Seguí avanzando en los tramos más difíciles hasta llegar a la cima.' },
    ],
  },

  'Recorrido por El Níspero Zoo': {
    resumen:
      'Recorrido a pie con compañeros por el zoológico y jardín botánico El Níspero, en El Valle de Antón, observando aves y otras especies en sus recintos.',
    etapas: {
      investigacion:
        'El Níspero alberga especies nativas de Panamá, algunas amenazadas. Me interesaba verlas de cerca y entender qué papel cumple un centro así en su conservación.',
      preparacion:
        'Coordinamos el viaje en grupo, llevamos agua y ropa cómoda para caminar varias horas y preparamos los teléfonos para documentar lo que viéramos.',
      accion:
        'Recorrimos los senderos del lugar, nos detuvimos en los aviarios y recintos, y fotografiamos las especies, entre ellas aves como el pavón. Fuimos comentando lo que sabíamos de cada animal y leyendo la información disponible.',
      reflexion:
        'La caminata fue sencilla físicamente, pero me dejó una pregunta que no tenía: cuándo está justificado mantener animales en cautiverio. Algunos recintos parecían adecuados y otros me parecieron pequeños. Ahora veo los zoológicos con una mirada más crítica, sin dejar de valorar el trabajo de rescate que hacen.',
    },
    resultados: [
      { n: 5, evidencia: 'Organizamos y realizamos el recorrido en grupo, compartiendo lo que cada uno sabía de las especies.' },
      { n: 6, evidencia: 'Me informé sobre especies nativas amenazadas y la conservación de la biodiversidad.' },
      { n: 7, evidencia: 'Reflexioné sobre la ética de mantener animales en cautiverio.' },
    ],
  },

  'Subida al Cerro de la Cruz (4 km)': {
    resumen:
      'Ascenso a pie de aproximadamente 4 km hasta el Cerro de la Cruz, combinando carretera y sendero, con el valle cubierto de nubes al llegar arriba.',
    contexto: 'Recorrido de 4 km',
    portada: 'IMG_1205',
    etapas: {
      investigacion:
        'Después de otras caminatas quise intentar una ruta más larga. La subida al Cerro de la Cruz tiene unos 4 km y es conocida por la vista que se tiene temprano en la mañana.',
      preparacion:
        'Salimos temprano para evitar el calor. Llevamos agua y algo de comer, y calculamos el tiempo de ida y vuelta para no bajar con poca luz.',
      accion:
        'Caminamos el tramo de carretera y luego el sendero hasta la cima. Arriba el valle estaba cubierto por un mar de nubes; nos detuvimos a descansar, tomar fotos y luego emprendimos el descenso juntos.',
      reflexion:
        'Lo más difícil fue mantener un ritmo constante en la carretera en subida, donde el cansancio se nota más que en el sendero. Caminar en grupo hizo que la distancia se sintiera más corta. Me di cuenta de que mi condición física ha mejorado respecto a caminatas anteriores.',
    },
    resultados: [
      { n: 2, evidencia: 'Completé una ruta más larga que las anteriores, de unos 4 km en subida.' },
      { n: 4, evidencia: 'Mantuve el esfuerzo durante todo el ascenso y el descenso.' },
      { n: 5, evidencia: 'Caminamos en grupo, ajustando el paso para que nadie se quedara atrás.' },
    ],
  },

  'Visita al Parque Metropolitano': {
    resumen:
      'Salida escolar a los senderos del Parque Natural Metropolitano, un bosque tropical dentro de la ciudad de Panamá, con vista al skyline desde el mirador.',
    portada: 'IMG_0620',
    etapas: {
      investigacion:
        'La visita fue una salida del colegio. Me llamó la atención que exista un bosque de este tamaño dentro de la ciudad y quise aprovecharla para conocer los senderos y su fauna.',
      preparacion:
        'Seguimos las indicaciones del colegio: uniforme, agua, gorra y calzado para caminar. Antes de entrar recibimos una introducción sobre el parque.',
      accion:
        'Recorrimos los senderos con el grupo hasta el mirador, desde donde se ve el bosque y, detrás, los edificios de la ciudad. Durante el camino observamos la vegetación y comentamos lo que íbamos encontrando.',
      reflexion:
        'La imagen del bosque con los rascacielos detrás me hizo pensar en la presión que tiene la ciudad sobre sus áreas verdes. Fue una caminata moderada, pero útil para entender que la conservación también ocurre cerca de casa.',
    },
    resultados: [
      { n: 5, evidencia: 'Participé en el recorrido con mi grupo de clase siguiendo las normas de la salida.' },
      { n: 6, evidencia: 'Reflexioné sobre la protección de bosques urbanos frente al crecimiento de la ciudad.' },
    ],
  },

  /* =============================== CREATIVIDAD =============================== */

  'Fotografía astronómica – captura de la Luna': {
    resumen:
      'Sesión nocturna de fotografía de la Luna con cámara sobre trípode, probando ajustes de exposición y enfoque hasta obtener imágenes nítidas de su superficie.',
    portada: 'DSC02634',
    etapas: {
      investigacion:
        'Me interesa la fotografía y quería probar un tema técnico. La Luna parece fácil de fotografiar, pero suele salir como un punto blanco sobreexpuesto. Investigué qué ajustes se usan para captar los detalles de su superficie.',
      preparacion:
        'Elegí una noche despejada, monté la cámara en un trípode y preparé el encuadre. Aprendí que hay que bajar la exposición, usar el zoom al máximo y enfocar manualmente, además de evitar mover la cámara al disparar.',
      accion:
        'Tomé una serie de fotografías ajustando la exposición y el enfoque, revisando cada resultado en la pantalla de la cámara. También grabé el proceso. Al final seleccioné las tomas en que se distinguían los cráteres y los mares lunares.',
      reflexion:
        'Las primeras fotos salieron borrosas o quemadas, y entendí que la técnica importa tanto como el equipo. Ser paciente y cambiar un parámetro a la vez fue lo que funcionó. Me gustaría repetirlo en distintas fases lunares, cuando las sombras muestran más relieve.',
    },
    resultados: [
      { n: 2, evidencia: 'Aprendí a controlar la exposición y el enfoque manual en condiciones de poca luz.' },
      { n: 3, evidencia: 'Investigué la técnica y planifiqué la noche, el equipo y el encuadre por iniciativa propia.' },
      { n: 4, evidencia: 'Repetí las tomas varias veces hasta conseguir imágenes nítidas.' },
    ],
  },

  'Fotografiando al águila arpía en el summit': {
    resumen:
      'Fotografía del águila arpía, ave nacional de Panamá, en el Parque Municipal Summit, y posterior revisión y edición de las imágenes en computadora.',
    portada: 'IMG_0683',
    etapas: {
      investigacion:
        'El águila arpía es el ave nacional de Panamá y una especie amenazada. En el Parque Summit es posible verla de cerca, y me propuse obtener un retrato que mostrara el detalle de su plumaje.',
      preparacion:
        'Me informé sobre su comportamiento y sobre cómo fotografiar a través de recintos sin que la malla se note. Preparé la cámara con zoom y decidí no usar flash para no perturbar al animal.',
      accion:
        'Esperé a que el águila se posara en una posición con buena luz y tomé varias fotos de su cabeza y perfil. Después revisé las imágenes en la computadora, elegí las mejores y ajusté exposición, contraste y recorte.',
      reflexion:
        'Fotografiar fauna exige paciencia: el animal no posa, y la mayoría de las tomas no sirven. También aprendí que la edición tiene límites; si la foto original no está bien enfocada, no se puede corregir. Respetar la distancia y no usar flash fue una decisión que mantendría siempre.',
    },
    resultados: [
      { n: 2, evidencia: 'Practiqué fotografía de fauna con teleobjetivo y edición posterior, dos habilidades nuevas para mí.' },
      { n: 6, evidencia: 'Documenté una especie amenazada de importancia nacional y me informé sobre su conservación.' },
      { n: 7, evidencia: 'Fotografié sin flash y a distancia para no alterar el comportamiento del ave.' },
    ],
  },

  'Fotografías para la revista escolar (diversos artículos)': {
    resumen:
      'Producción de las fotografías que acompañan varios artículos de la revista escolar y su portada. Cada serie tiene un concepto visual propio según el texto que ilustra.',
    portada: '80171C52-31CD-49CE-BB03-BC5DED9D73EC',
    etapas: {
      investigacion:
        'La revista necesitaba imágenes propias para sus artículos. Me ofrecí a hacerlas porque quería trabajar la fotografía con un propósito concreto: transmitir la idea de un texto escrito por otra persona.',
      preparacion:
        'Para cada artículo leí el texto o hablé con su autor y definí un concepto: estética VHS, la idea de una caja de cristal, la nostalgia, el error como algo bello. Elegí locaciones dentro y fuera del colegio, coordiné horarios con las personas fotografiadas y les pedí su permiso para publicar las imágenes.',
      accion:
        'Realicé varias sesiones con distintos compañeros como modelos, usando luz natural, flash y encuadres poco convencionales según cada concepto. Después seleccioné y edité las fotos de cada serie y las entregué al equipo de la revista, incluida la imagen de portada.',
      reflexion:
        'Fue el proyecto más largo y constante de mi CAS creativo. Aprendí a traducir una idea escrita en una imagen y a dirigir a otras personas frente a la cámara, algo que al principio me incomodaba. También entendí que trabajar para una publicación implica cumplir plazos y aceptar comentarios sobre mi trabajo.',
    },
    resultados: [
      { n: 3, evidencia: 'Planifiqué cada sesión: concepto, locación, modelos y horario.' },
      { n: 4, evidencia: 'Mantuve el compromiso a lo largo de varios artículos y entregas.' },
      { n: 5, evidencia: 'Trabajé con autores, modelos y el equipo editorial de la revista.' },
      { n: 7, evidencia: 'Pedí consentimiento a las personas fotografiadas antes de publicar sus imágenes.' },
    ],
  },

  'Jóvenes Creativos – Fundación Rofé': {
    resumen:
      'Programa de ocho meses de la Fundación Rofé que reúne a jóvenes para desarrollar pensamiento creativo mediante talleres y retos en equipo.',
    contexto: 'Programa de 8 meses',
    etapas: {
      investigacion:
        'Supe del programa Jóvenes Creativos y me interesó porque trabajaba la creatividad como un proceso que se puede practicar, no solo como talento artístico. Decidí postularme y comprometerme con su duración.',
      preparacion:
        'Organicé mi horario para asistir a las sesiones durante los ocho meses sin descuidar mis responsabilidades del Diploma.',
      accion:
        'Participé en talleres y retos de diseño en equipo. En uno de ellos teníamos que construir la estructura más alta y estable posible con materiales limitados, como fideos y cinta, en un tiempo fijo: planificamos, probamos, se nos cayó y la reconstruimos.',
      reflexion:
        'Lo que más me sirvió fue trabajar con personas que no conocía y que pensaban distinto. En los retos aprendí que el primer intento casi nunca funciona y que el equipo avanza más rápido cuando se prueba y se corrige que cuando se discute demasiado la idea perfecta. Sostener el compromiso durante ocho meses también fue un reto en sí.',
    },
    resultados: [
      { n: 1, evidencia: 'Identifiqué que propongo ideas con facilidad, pero que debo escuchar más antes de decidir.' },
      { n: 4, evidencia: 'Asistí al programa durante ocho meses.' },
      { n: 5, evidencia: 'Resolví retos de diseño en equipo con participantes que no conocía antes del programa.' },
    ],
  },

  'Olimpiadas Nacionales de Robótica 2025': {
    resumen:
      'Participación en la fase regional de las Olimpiadas Nacionales de Robótica 2025 con un robot explorador de temática espacial, con panel solar y brazo robótico.',
    contexto: 'Fase regional',
    portada: 'IMG_8103',
    etapas: {
      investigacion:
        'La robótica une dos cosas que me interesan: construir y programar. Al conocer la convocatoria de las Olimpiadas formamos un equipo y elegimos la exploración espacial como tema del proyecto.',
      preparacion:
        'Diseñamos un vehículo explorador con un brazo robótico y un panel solar, repartimos tareas entre construcción, programación y presentación, y preparamos un stand con la temática del proyecto. Hicimos pruebas del robot antes de la competencia.',
      accion:
        'Transportamos el robot y el stand hasta la sede de la fase regional, montamos la exhibición y presentamos el proyecto al jurado, explicando su diseño y funcionamiento.',
      reflexion:
        'Antes de la competencia tuvimos fallos con las conexiones y el movimiento del brazo que nos obligaron a rediseñar partes a última hora. Aprendí a buscar el origen de un problema paso a paso en lugar de cambiar todo a la vez. También vi la importancia de saber explicar el proyecto con claridad, no solo de que funcione.',
    },
    resultados: [
      { n: 2, evidencia: 'Resolví problemas de construcción y programación del robot antes de la competencia.' },
      { n: 4, evidencia: 'Sostuve semanas de trabajo y pruebas hasta presentar en la fase regional.' },
      { n: 5, evidencia: 'Repartimos y coordinamos las tareas de diseño, programación y presentación en equipo.' },
    ],
  },

  /* ================================= SERVICIO ================================= */

  'Día de limpieza del laboratorio del colegio con 12.º A IB': {
    resumen:
      'Jornada de limpieza y organización del laboratorio de ciencias del colegio realizada por el grupo de 12.º A IB.',
    etapas: {
      investigacion:
        'Usamos el laboratorio a diario para las asignaturas de ciencias y notamos que los materiales y mesones necesitaban una limpieza a fondo. Como grupo decidimos dedicar una jornada a dejarlo en mejores condiciones.',
      preparacion:
        'Coordinamos con el personal del colegio el día y lo que se podía limpiar, conseguimos guantes, mascarillas y productos de limpieza, y nos repartimos por zonas.',
      accion:
        'Limpiamos mesones, lavaderos y material de vidrio, ordenamos los estantes y retiramos lo que ya no servía, siguiendo las indicaciones de seguridad para manipular el material del laboratorio.',
      reflexion:
        'Fue un trabajo sencillo, pero me hizo valorar el mantenimiento que normalmente no vemos. Trabajar con todo el grupo hizo que la tarea se terminara rápido y que cada uno se sintiera responsable de un espacio que compartimos.',
    },
    resultados: [
      { n: 5, evidencia: 'Trabajamos como grupo de clase repartiendo zonas y tareas.' },
      { n: 7, evidencia: 'Seguimos las normas de seguridad y asumimos la responsabilidad de cuidar un espacio común.' },
    ],
  },

  'Proyecto eButterfly': {
    resumen:
      'Proyecto de ciencia ciudadana: salidas de campo para observar, fotografiar y registrar mariposas en la plataforma eButterfly, liberándolas después de documentarlas.',
    portada: 'IMG_4843',
    etapas: {
      investigacion:
        'eButterfly es una plataforma donde cualquier persona puede registrar observaciones de mariposas y aportar datos sobre su distribución. Me pareció una forma concreta de contribuir a la investigación sobre biodiversidad en Panamá.',
      preparacion:
        'Aprendí a usar la plataforma y qué datos requiere cada registro: especie, fecha, lugar y fotografía. Preparamos una red y un contenedor de malla para observar las mariposas sin dañarlas.',
      accion:
        'En las salidas de campo buscamos mariposas en la vegetación, las colocamos brevemente en el contenedor para fotografiarlas desde varios ángulos y las liberamos. Luego subimos las observaciones con sus fotografías a eButterfly.',
      reflexion:
        'Identificar especies fue más difícil de lo que pensaba, porque muchas se parecen. Aprendí que la calidad de los datos depende de detalles como la foto y la ubicación exacta. También tuve presente que el bienestar del animal está por encima de conseguir la foto.',
    },
    resultados: [
      { n: 2, evidencia: 'Aprendí a capturar, fotografiar e identificar mariposas y a registrar datos científicos.' },
      { n: 6, evidencia: 'Aporté datos a una base internacional sobre biodiversidad y distribución de especies.' },
      { n: 7, evidencia: 'Manipulé a las mariposas el menor tiempo posible y las liberé tras documentarlas.' },
    ],
  },

  'Teletón 2025': {
    resumen:
      'Voluntariado en la Teletón 2025: organización de mercancía en bodega, apoyo logístico durante el evento y recolección de donaciones.',
    portada: 'IMG_3268',
    etapas: {
      investigacion:
        'La Teletón recauda fondos para la atención de niños y jóvenes con discapacidad en Panamá. Quise participar como voluntario porque era una forma de ayudar con trabajo concreto a una causa nacional.',
      preparacion:
        'Me inscribí como voluntario, asistí a las indicaciones del equipo organizador y me asignaron al área de logística y mercancía.',
      accion:
        'Doblé, clasifiqué por talla y ordené en estanterías las camisetas y demás artículos para la venta, preparé las cajas para su distribución y apoyé tras bastidores durante el evento. También participé en la recolección de donaciones.',
      reflexion:
        'Gran parte del trabajo de un evento así no se ve en la transmisión: es ordenar, cargar y repetir. Entendí que ese trabajo es tan necesario como el que ocurre en el escenario. Me quedó claro que el servicio no siempre es visible, y que la constancia en tareas pequeñas es lo que permite que todo funcione.',
    },
    resultados: [
      { n: 4, evidencia: 'Cumplí las jornadas de trabajo asignadas en logística durante el evento.' },
      { n: 5, evidencia: 'Trabajé con otros voluntarios y con el equipo organizador.' },
      { n: 6, evidencia: 'Apoyé una campaña nacional por la inclusión de personas con discapacidad.' },
    ],
  },
}

/**
 * Títulos alternativos para las subcarpetas (álbumes) si se desea mostrarlas con
 * otro nombre. Si un álbum no aparece aquí se usa el nombre de la carpeta.
 */
export const ALBUMES = {
  'AL2.0 nostalgia': 'AL 2.0 — Nostalgia',
}
