# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A responsive React movie search application built with Vite that allows users to search movies via the OMDb API, view detailed information, and save favorites to localStorage.

**Tech Stack:**
- **Frontend:** React 18 + Vite
- **Routing:** React Router (routes: `/`, `/movie/:imdbID`, `/favorites`)
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** CSS3 with custom Grid/Flexbox (NO Tailwind)
- **Icons:** @heroicons/react
- **Testing:** Vitest + React Testing Library
- **Storage:** localStorage for favorites persistence
- **API:** OMDb API (requires API key)

## Essential Commands

**Package Management:**
```bash
# Always use pnpm for this project
pnpm install           # Install dependencies
pnpm add <package>     # Add a package
pnpm remove <package>  # Remove a package
```

**Development:**
```bash
pnpm run dev      # Start dev server (http://localhost:5173)
pnpm run build    # Production build
pnpm run preview  # Preview production build
pnpm run test     # Run Vitest tests
```

**Initial Setup (if starting fresh):**
```bash
npm create vite@latest . -- --template react
pnpm install
pnpm install react-router-dom @tanstack/react-query @heroicons/react
pnpm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom prettier eslint-config-prettier
```

## Architecture & Code Structure

### Component Hierarchy
```
App (QueryClientProvider + Router)
└── AppShell (header + nav)
    ├── SearchPage
    │   ├── SearchBar (debounced input)
    │   └── MovieCard[] (responsive grid)
    ├── MovieDetailPage
    │   ├── MovieHeader (poster + title)
    │   ├── MovieFacts (metadata)
    │   └── FavoriteButton
    └── FavoritesPage
        └── MovieCard[] (from localStorage)
```

### Key Directories
```
src/
├── components/     # Reusable UI components (SearchBar, MovieCard, etc.)
├── pages/          # Route-level components (SearchPage, MovieDetailPage, FavoritesPage)
├── hooks/          # Custom hooks (useMovieSearch, useFavorites, useDebounce)
├── services/       # API layer (omdbApi.js)
├── styles/         # Component-specific CSS files
└── test/           # Test setup and utilities
```

### State Management Pattern

**API Data (TanStack Query):**
- Search queries: `['search', query, page, type, year]`
- Movie details: `['movie', imdbID]`
- Favorites list: `['favorites', [...imdbIDs]]`
- Stale times: 1 min (search), 5 min (details)

**Local Storage:**
- Key: `movieapp:favorites:v1`
- Format: `[{ imdbID: string, addedAt: string }, ...]`

## Critical Requirements

### Environment Variables
- **Required:** `VITE_OMDB_API_KEY` in `.env` file
- API key from: http://www.omdbapi.com/apikey.aspx
- Never commit `.env` to git (in `.gitignore`)

### Styling Convention
- **Use CSS3 only** - NO Tailwind classes
- CSS files in `src/styles/` directory
- Import CSS at component level: `import '../styles/ComponentName.css'`
- Mobile-first responsive design with breakpoints: 640px, 768px, 1024px
- Responsive grid: 2 cols (mobile) → 3 (tablet) → 4 (desktop) → 5 (large desktop)

### Accessibility Standards
- **Target:** WCAG 2.1 AA compliance
- Lighthouse accessibility score ≥ 90
- Proper ARIA labels for all interactive elements
- Focus management and keyboard navigation
- Color contrast ≥ 4.5:1
- Respect `prefers-reduced-motion`

### Performance Targets
- Lighthouse Performance ≥ 85 on mobile
- First search result < 2s on 4G
- Debounced search input (500ms delay)
- Lazy loading for images
- No console errors

## OMDb API Integration

### Search Endpoint
```javascript
GET https://www.omdbapi.com/?apikey=<KEY>&s=<query>&page=<n>&type=<type>&y=<year>
Response: { Search: [...], totalResults: "123", Response: "True" }
```

### Details Endpoint
```javascript
GET https://www.omdbapi.com/?apikey=<KEY>&i=<imdbID>&plot=full
Response: { Title, Year, Plot, Genre, Director, Actors, Ratings, ... }
```

### Error Handling
- `Response: "False"` → Handle gracefully (show empty state or error message)
- `Error: "Movie not found!"` → Return empty results
- Network errors → Retry once, show actionable error message
- No poster (`Poster: "N/A"`) → Use placeholder with 🎬 emoji

## Development Milestones

This project follows a 4-milestone structure (see `/miilestone/` directory):

1. **M1: Scaffold & Basics** - Vite setup, routing, AppShell, CSS foundation
2. **M2: Search Flow** - SearchBar, API integration, MovieCard grid, pagination
3. **M3: Details & Favorites** - MovieDetailPage, localStorage favorites, FavoriteButton
4. **M4: Polish** - Accessibility pass, testing, error boundaries, performance optimization

Each milestone has detailed implementation steps in `/miilestone/Milestone*/m*.md`

## Testing Guidelines

**Test Coverage Expectations:**
- Unit tests for hooks (useDebounce, useFavorites)
- Component tests for SearchBar, MovieCard, FavoriteButton
- Integration tests for search flow and favorites persistence
- Accessibility tests with @testing-library/jest-dom

**Run Tests:**
```bash
pnpm run test          # Run all tests
pnpm run test -- --ui  # Run with Vitest UI (if installed)
```

## Reference Documentation

**Key Files to Review:**
- `/01-project-scope.md` - Complete feature list, data models, component breakdown
- `/02-wireframes-overview.md` - UI design patterns and responsive behavior
- `/miilestone/Milestone*/m*.md` - Step-by-step implementation guides
- `/04-SETUP_INSTRUCTIONS.md` - Deployment options and common issues

**Wireframe Images:** `/img/Step-0.png` through `/img/Step-04.png`

## Common Patterns

### Debounced Search
```javascript
const [query, setQuery] = useState('');
const debouncedQuery = useDebounce(query, 500);
const { data } = useMovieSearch(debouncedQuery, page);
```

### URL State Sync
```javascript
const [searchParams, setSearchParams] = useSearchParams();
useEffect(() => {
  if (query) setSearchParams({ q: query });
}, [query]);
```

### Favorites Toggle
```javascript
const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
const handleToggle = () => {
  isFavorite(imdbID) ? removeFromFavorites(imdbID) : addToFavorites(imdbID);
};
```

## Important Notes

- **Always use pnpm** for package management (per user configuration)
- **No Tailwind** - Use custom CSS3 in `/src/styles/` directory
- **Prisma:** If database schema changes are needed, run `npx prisma generate` (per user config)
- Search requires minimum 2 characters to trigger API call
- Pagination: 10 results per page from OMDb API
- Images should use `loading="lazy"` attribute
- All error states should show emoji + helpful message
