# CVGCA — Central Valley Gujarati Community Association

A website for a non-profit cultural association. The site lets the community
browse upcoming events, view past event galleries, read blog posts, discover
sponsors, and sign up to volunteer.

![CVGCA website screenshot](docs/screenshot1.png)

> **Static-first demo.** The public-facing site (Home, Events, Gallery, Blog,
> Sponsors) renders from hardcoded content in
> [`client/src/data/content.ts`](client/src/data/content.ts), with all images
> bundled as assets. It runs and deploys entirely on its own — **no backend or
> database required**. The Express + MySQL backend is optional and only powers
> the admin dashboard's create/edit/delete tooling.

## Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- TipTap rich-text editor

**Backend** (optional — admin dashboard only)
- Node.js + Express 5
- Sequelize ORM
- MySQL
- Multer (image uploads)

## Features

- **Home** — hero, featured event, sponsor strip, and highlights from past events.
- **Events** — upcoming cultural and educational events with ticket/registration links.
- **Gallery** — past events organised into albums, each linking to a photo drive.
- **Blog** — articles rendered from rich-text (TipTap) content, with detail pages.
- **Sponsors** — sponsor logos linking out to partner sites.
- **Volunteering & Contact** — community engagement pages.
- **Admin dashboard** — create, edit, and delete events, sponsors, blogs, and
  gallery content, including image uploads (requires the optional backend).

## Project Structure

```
.
├── client/        React + Vite + TypeScript frontend
│   └── src/
│       ├── components/   Reusable UI and page sections
│       ├── pages/        Routed pages (Home, Events, Gallery, Blog, Dashboard…)
│       ├── data/         content.ts — hardcoded site content (no backend)
│       ├── assets/       Images, icons, and fonts
│       └── api.ts        API base URL configuration (admin dashboard only)
└── Server/        Express + Sequelize REST API
    ├── Routes/    Express routers (one per resource)
    ├── models/    Sequelize models
    ├── config/    Database configuration (env-driven)
    └── uploads/   Runtime image uploads (git-ignored)
```

## Getting Started

### Run the site (no backend needed)

The public site is fully self-contained — just run the frontend:

```bash
cd client
npm install
npm run dev               # starts Vite on http://localhost:5173
```

That's it. Edit content in [`client/src/data/content.ts`](client/src/data/content.ts).

### Optional: backend for the admin dashboard

Only needed if you want the `/dashboard` create/edit/delete tooling.

**Prerequisites:** Node.js 18+ and a running MySQL instance.

```bash
cd Server
cp .env.example .env      # then fill in your MySQL credentials
npm install
npm run dev               # starts the API on http://localhost:3001
```

Create the database referenced by `DB_NAME` (default `cvgca`) in MySQL before
starting. Sequelize creates the tables automatically on first run. Point the
client at it via `VITE_API_BASE_URL` in `client/.env`.

## Environment Variables

**Server (`Server/.env`)**

| Variable      | Default     | Description     |
| ------------- | ----------- | --------------- |
| `DB_HOST`     | `127.0.0.1` | MySQL host      |
| `DB_PORT`     | `3306`      | MySQL port      |
| `DB_USER`     | `root`      | MySQL user      |
| `DB_PASSWORD` | _(empty)_   | MySQL password  |
| `DB_NAME`     | `cvgca`     | Database name   |
| `PORT`        | `3001`      | API server port |

**Client (`client/.env`)**

| Variable            | Default                 | Description         |
| ------------------- | ----------------------- | ------------------- |
| `VITE_API_BASE_URL` | `http://localhost:3001` | Base URL of the API |

## API Overview

The server exposes REST endpoints, most supporting full CRUD:

| Resource           | Base path            |
| ------------------ | -------------------- |
| Sponsors           | `/sponsors`          |
| Events             | `/events`            |
| Educational events | `/educationalevents` |
| Featured event     | `/featuredevent`     |
| Blogs              | `/blogs`             |
| Gallery events     | `/galleryevents`     |
| Gallery images     | `/galleryimages`     |
| Event names        | `/eventnames`        |
| Old highlights     | `/oldhighlights`     |
| Photo stack        | `/photostack`        |
| Image upload       | `/upload`            |

Uploaded images are served statically from `/uploads`.

## Available Scripts

**Client**
- `npm run dev` — start the dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

**Server**
- `npm run dev` — start with nodemon (auto-reload)
- `npm start` — start the server
