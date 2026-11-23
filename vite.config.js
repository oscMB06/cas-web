import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Las fotos originales pesan mucho; Vite solo debe vigilar las versiones optimizadas.
    watch: { ignored: ['**/actividad cas/**'] },
  },
})
