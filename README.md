# Bnb Frontend

- Byggt med **React + TypeScript (Vite)**
- Auth via **Supabase**
- Pratar med backend-API via en enkel `api.ts`
- Visar:
  - Listings (lista, detalj, skapa, uppdatera, ta bort)
  - Registrering / inloggning
  - **Mina bokningar** (hämtas från `/bookings`) 

------------------------------------------------------------------------

## Kör lokalt

1. Klona repot:

   git clone https://github.com/bjornwildenstam/bnb-frontend.git
   cd bnb-frontend

------------------------------------------------------------------------

Installera beroenden:

npm install
Skapa en .env.local i projektroten:

env
Kopiera kod
VITE_API_URL=http://localhost:3000          # eller din deployade backend-URL
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY

------------------------------------------------------------------------

Starta dev-server:

npm run dev
Appen kör då på t.ex. http://localhost:5173.
