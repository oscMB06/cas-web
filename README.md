# Portafolio CAS — Oscar Orlando Maria Barranti

12.º A IB · Academia Bilingüe Panamá para el Futuro (ABPF)
React + Vite + Tailwind CSS. Sitio de solo lectura para exhibición.

## Cómo correrlo

```bash
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
```

Versión publicable: `npm run build` (queda en `dist/`) y `npm run preview` para probarla.

## Dónde está cada cosa

| Qué | Archivo |
|---|---|
| Textos de cada experiencia (resumen, reflexión por etapas, resultados y evidencias, foto de portada) | `src/data/contenido.js` |
| Datos del estudiante, categorías, los 7 Resultados de Aprendizaje y las etapas | `src/data/cas.js` |
| Lectura automática de fotos y videos | `src/data/experiencias.js` |
| Conversión de fotos y videos | `scripts/procesar-medios.mjs` |

## Fotos y videos

- Los originales están en **`actividad cas/<Categoría>/<Experiencia>/`** (las subcarpetas se muestran como álbumes).
- Antes de `dev` y `build` se ejecuta `scripts/procesar-medios.mjs` (también con `npm run media`), que guarda en `src/media/`:
  - fotos (JPG, PNG, HEIC, CR2…) convertidas a WebP, en tamaño completo y en miniatura;
  - videos (MOV, MP4, M4V, WEBM) convertidos a MP4 H.264 con su imagen de póster;
  - `medios.json`, con las dimensiones y la duración de cada archivo.
- Se eliminan los metadatos (incluida la ubicación GPS) y se ignoran los duplicados exactos. Solo se procesa lo nuevo o modificado.
- La web lee `src/media/` con `import.meta.glob`, así que no hay nombres de archivo escritos a mano. Para añadir algo, basta con ponerlo en su carpeta y volver a ejecutar `npm run dev`.
