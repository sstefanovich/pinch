# Pinch

**A pinch of help in the kitchen** — Quick tools for converting, scaling, timing & reference.

A React web app that provides handy kitchen utilities: unit conversion, recipe scaling, kitchen timers, measurement reference, and ingredient substitutions.

## Features

| Tool | Description |
|------|-------------|
| **Unit Converter** | Convert cups, tablespoons, teaspoons, ml, fl oz, grams, ounces & temperatures (°F/°C) |
| **Recipe Scaler** | Scale recipes up or down by changing the number of servings. Paste ingredients (one per line); lines like `2 cups flour` are auto-scaled |
| **Kitchen Timer** | Run one or more timers with optional labels. Pause, resume, remove. Active timers appear on the home page |
| **Measurement Reference** | Pinch, dash, smidgen, and other cooking measures with equivalents |
| **Common Substitutions** | Searchable swaps for buttermilk, eggs, butter, cream, flour, and more |

## Tech Stack

- **React 19** + TypeScript
- **Vite** for dev/build
- **React Router** for navigation
- **Tailwind CSS** for styling

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

## Deployment (Azure Static Web Apps)

The app is configured for Vite, which outputs to `dist`. The workflow at `.github/workflows/azure-static-web-apps.yml` uses `output_location: "dist"` accordingly.

If you connected Azure before adding this workflow, you may have an auto-generated workflow (e.g. `azure-static-web-apps-<name>.yml`) that still expects `build`. Either:

- **Replace it** with the workflow in this repo, or  
- **Edit** the existing workflow and change `output_location` from `"build"` to `"dist"`.

Ensure the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret (or your app-specific token) is set in GitHub repo secrets.

## Project Structure

```
src/
├── App.tsx           # Routes & TimerProvider
├── Layout.tsx        # Header, nav, footer
├── context/
│   └── TimerContext.tsx
└── pages/
    ├── Home.tsx
    ├── Converter.tsx
    ├── Scaler.tsx
    ├── Timer.tsx
    ├── Reference.tsx
    └── Substitutions.tsx
```
