import React, { useState } from 'react';
import { searchMovies } from './api/searchMovies';

function App() {
  const [query, setQuery] = useState(''); // This stores what the user types in
  const [results, setResults] = useState([]); // Stores the results/movies that came up

  // search function part, handleSearch calls my searchMovies API
  const handleSearch = async () => { 
    if (!query) return; // this returns nothing if the search is just empty

    try { // trying to handle the errors
      const data = await searchMovies(query);
      if (data && data.Search) { // if there are results, set them
        setResults(data.Search);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setResults([]);
    }
  }; 

} 
