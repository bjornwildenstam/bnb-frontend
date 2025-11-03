/// <reference types="vite/client" />

// Lägg till dina egna env-nycklar här så får TS rätt typer
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // lägg fler VITE_* här vid behov
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}