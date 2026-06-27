import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react({
    // Disable React Compiler — causes runtime crashes with complex hooks
    babel: {
      plugins: [],
    },
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'es2022',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'firebase-vendor': ['firebase/app', 'firebase/firestore'],
          'ui-vendor': ['lucide-react', 'zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
