# Movie Search App - Step-by-Step Setup Instructions

## Overview
These instructions will guide you through building a responsive React movie search application that allows users to search for movies, view details, and save favorites. The project is divided into 4 milestones as outlined in the project scope.

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- OMDb API key (free registration at http://www.omdbapi.com/apikey.aspx)
- Basic knowledge of React and modern web development

## Deliverables
- Day 1 Project Setup

-[ ] Complete 02-wireframes-overview.md
- [ ] Complete 03-trello-project-board-guide.md
- [ ] Milestone 1: Foundation
        - Navigate to [milestone](./milestone/Milestone1/m1.md) for detailed instructions on setting up the project.
- [ ] Update your GitHub Links 
    - [ ] Create a GitHub repository for your project
    - [ ] Add all above artifact to GitHub repository 
        - [ ] `git add .`
        - [ ] `git commit -m "your meaningful commit message"`
        - [ ] `git push `
        - [ ] Add the repo link to Beacon.

- Day 2 Search Functionality
- [ ] Milestone 2: Search Flow
        - Navigate to [milestone](./milestone/Milestone2/m2.md) for detailed instructions on implementing search functionality.
- [ ] Milestone 3: Detail & Favorites
        - Navigate to [milestone](./milestone/Milestone3/m3.md) for detailed instructions on implementing movie details and favorites functionality.

Day 3 Polish & Performance
- [ ] Milestone 4: Polish & Performance

Day 4 Testing & Deployment
- [ ] Write tests for components and hooks
- [ ] Deploy the application using Vercel or GitHub Pages


## 🚀 Deployment Options

### Option 1: Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variable `VITE_OMDB_API_KEY` in project settings
3. Deploy automatically on commits

### Option 2: GitHub Pages (with GitHub Actions)
1. Create `.github/workflows/deploy.yml`
2. Configure secrets for `VITE_OMDB_API_KEY`
3. Push to main branch triggers deployment

## 📝 Additional Enhancements (Stretch Goals)

### Add Dark Mode
- Implement theme context
- Add toggle in header
- Persist preference in localStorage

### Add Filters
- Year range picker
- Movie type filter (movie/series)
- Sort by rating/year

### Add Recent Searches
- Store recent searches in localStorage
- Display as clickable chips
- Limit to last 5 searches

### Add Keyboard Shortcuts
- `/` to focus search
- `Escape` to clear search
- Arrow keys for navigation

## 🐛 Common Issues & Solutions

### API Key Issues
- Ensure `.env` file is in project root
- Restart dev server after adding API key
- Check OMDb API key is valid and has quota remaining

### CORS Issues
- OMDb API should work directly from browser
- If issues persist, consider using a proxy service

### Performance Issues
- Implement image lazy loading
- Add debounced search
- Use React.memo for expensive components
- Consider virtualizing large lists

### Accessibility Issues
- Test with screen reader
- Ensure proper focus management
- Add skip links for keyboard users
- Verify color contrast ratios


