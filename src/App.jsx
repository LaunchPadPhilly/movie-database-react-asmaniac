// src/App.jsx
import React, { useState } from 'react';
import { searchMovies } from './api/searchMovies';
import './App.css'; // 

function App() {
  const [query, setQuery] = useState(''); // stores user input
  const [results, setResults] = useState([]); // stores movie results

  // search function calls searchMovies API
  const handleSearch = async () => {
    if (!query) return; // do nothing if query is empty

    try {
      const data = await searchMovies(query);
      if (data && data.Search) {
        setResults(data.Search); // update results
      } else {
        setResults([]); // no results found
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setResults([]);
    }
  };

  return (
    <div>
      // website's header
      <header>
        <h1>🎬 Movie Magic</h1>
        <button className="search-button" onClick={handleSearch}>🔍 Search</button>
        <button className="favorites-button">❤️ Favorites</button>
      </header>

      // the search bar of the website
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      // results of movies
      <div className="results">
        {results.map((movie) => ( // movie cards
          <div key={movie.imdbID} className="movie-card">
            <div>🎞️</div>
            <div className="movie-title">{movie.Title}</div>
            <div className="movie-details">{movie.Year} • {movie.Type}</div>
          </div>
        ))}
      </div>

      // loading more buttons
      {results.length > 0 && (
        <button className="load-more">Load More 🎥</button>
      )}
    </div>
  );
}

export default App;
