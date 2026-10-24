# Blacklight Motion

Portfolio site for Blacklight Motion, built with React + Vite.

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build in dist/
```

- Portfolio videos live in `src/data/work.js`. Add or remove an entry there to change the grid.
- Videos are streamed from `https://zigsmotion.com/showcase/` (the `MEDIA` constant). To self-host, put the files in `public/showcase/` and set `MEDIA = "./showcase/"`.
- Deploy the `dist/` folder to any static host (Vercel, Netlify, GitHub Pages).
