# 1) Overview

**Goal:** A responsive React web app that lets users search movies, view key details, and save favorites—fast, accessible, and reliable.
**Primary Users:** Casual movie fans browsing titles on desktop or mobile.
**Success Metrics:** Time-to-first-result < 2s on 4G, Core Web Vitals “good”, zero console errors, >90 Lighthouse accessibility.

# 2) Core Features (MVP)

* **Search** movies by title (debounced input).
* **Results List** with poster, title, year, type (movie/series).
* **Pagination / “Load more”** for large result sets.
* **Movie Detail View** with poster, plot, genre, rating, runtime, release date.
* **Favorites (client-side)** add/remove; persisted in `localStorage`.
* **Empty / Loading / Error states** everywhere (skeletons + helpful messages).
* **Responsive UI** (mobile-first) and keyboard navigable.
* **Basic Analytics** (page views, search count) via lightweight in-app counters (no external tracker required).

# 3) Stretch Features (Nice-to-Have)

* **Filter/Sort:** by year, type, or IMDb rating (if available).
* **Recent Searches** (local, clickable chips).
* **Shareable URLs** (query in URL params).
* **Dark/Light Theme** toggle.
* **Internationalization (i18n)** for labels.
* **Offline fallback** (cache last results with Service Worker).

# 4) Non-Functional Requirements

* **Accessibility:** WCAG 2.1 AA for key flows; proper labels, focus order, and roles.
* **Security:** API key stored in env; no secrets in client repo.
* **Reliability:** Graceful API failures; retry once on transient errors; show actionable messages.

# 5) Tech Stack

* **Frontend:** React + Vite (or CRA), React Router.
* **State:** React Query (data fetching + caching) or basic `useState`/`useReducer` for MVP.
* **UI:** CSS3 + Headless UI (or shadcn/ui) for accessible components.
* **HTTP:** `fetch` (built-in).
* **Testing:** Vitest + React Testing Library; Playwright for e2e (stretch goal).
* **Lint/Format:** ESLint, Prettier.
* **Env:** `.env` for API key (e.g., `VITE_OMDB_API_KEY`).

# 6) External API

Use a public movie API like **OMDb**.

* **Search:** `GET https://www.omdbapi.com/?apikey=<KEY>&s=<query>&page=<n>`
* **Details:** `GET https://www.omdbapi.com/?apikey=<KEY>&i=<imdbID>&plot=full`
  **Rate limits:** Handle 401/403, 429 (backoff), and no-results responses.

# 7) Information Architecture & Routing

* `/` – Search page (input, filters, results).
* `/movie/:imdbID` – Detail page.
* `/favorites` – Saved titles.
* **URL params:** `?q=matrix&page=2&type=movie&year=1999`

# 8) UX & Component Breakdown

**Global**

* `AppShell` (Header with search shortcut, ThemeToggle, Nav to Favorites)
* `Toast` for errors
* `RouteLoader` skeletons

**Search Page**

* `SearchBar` (debounced, clear button, ARIA labels)
* `FilterBar` (type dropdown, year input)
* `ResultsGrid`

  * `MovieCard` (poster fallback, title as link, year)
* `Paginator` or “Load more” button

**Detail Page**

* `MovieHeader` (poster, title, metadata)
* `MovieFacts` (genre, runtime, released, ratings)
* `PlotSection`
* `FavoriteButton`

**Favorites Page**

* `FavoriteList` (uses localStorage)
* Empty state + CTA to search

# 9) Data Model (frontend)

```ts
type SearchResult = {
  imdbID: string;
  Title: string;
  Year: string;          // normalize to number in UI if needed
  Type: "movie" | "series" | "episode";
  Poster: string;        // may be "N/A"
};

type MovieDetail = SearchResult & {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: { Source: string; Value: string }[];
};

type Favorite = { imdbID: string; addedAt: string };
```

# 10) State & Caching Strategy

* **TanStack** keys: `["search", q, page, type, year]`, `["movie", imdbID]`.
* **Stale times:** search 60s, movie detail 5m.
* **Local Storage:** `favorites:v1`, `recentSearches:v1`, `theme:v1`.

# 11) Error Handling & Edge Cases

* No poster → show placeholder illustration + alt text.
* API `Response: False` → friendly empty state.
* Network error → retry once; show “Try again” with link to status.
* Invalid query (short strings) → require min length (e.g., 2 chars).

# 12) Accessibility Checklist

* Labels for search input & filters.
* Keyboard: tab order, focus ring visible, `Enter` submits search.
* ARIA roles for lists/results; `aria-busy` during loading.
* Color contrast ≥ 4.5:1; prefers-reduced-motion respected.

# 13) Testing Plan

* **Unit:** SearchBar debouncing, favorites reducer, helpers.
* **Component:** MovieCard renders fallbacks; Detail page shows key fields.
* **Integration:** typing a query triggers fetch + renders results; add/remove favorite persists.
* **e2e (stretch):** basic happy path across routes.

# 14) Analytics (lightweight)

* Count searches per session, top query length, favorites count.
* Log to console in dev; stub function for future provider.

# 15) Project Milestones & Deliverables

**M1 – Scaffold & Basics (1 days)**

* Vite + React + TS, Tailwind, Router, ESLint/Prettier.
* Header, routes, placeholder pages.
* Env wiring for API key.

**M2 – Search Flow (1 days)**

* SearchBar (debounce), call OMDb, render ResultsGrid.
* Loading/empty/error states.
* URL sync `?q=` + paging.

**M3 – Details & Favorites (1 days)**

* Detail page fetch + layout.
* Add/remove favorites + localStorage.
* Favorites page + empty state.

**M4 – Polish (1 day)**

* Accessibility pass, responsive tweaks.
* Basic tests (unit/integration).
* Lighthouse run + performance fixes.

# 18) Acceptance Criteria (MVP)

* Entering `star wars` shows at least 1 page of results with posters or fallbacks.
* Clicking a result navigates to `/movie/:imdbID` and displays plot + metadata.
* Adding/removing favorites updates the Favorites page and persists after reload.
* Refreshing a search URL re-runs the query with correct state.
* All routes usable with keyboard only; no console errors; Lighthouse A11y ≥ 90.

# 19) Out of Scope (MVP)

* Auth & server-side user profiles.
* Server-side rendering (SSR) and SEO.
* Real-time data or push notifications.
