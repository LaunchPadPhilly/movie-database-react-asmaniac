import { OMDB_API_KEY } from "./config.js"; // importing my movie api key from config.js file

const BASE_URL = "https://www.omdbapi.com/"; // base url for the api website

export async function  searchMovies(query) { //export an asynchonous function to search for movies
//constructing the full url for the api request
    const url = `${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${OMDB_API_KEY}`;
    try { // try will make fetch request and then return the data
          const res = await fetch(url); // fetching the url like i said
          const data = await res.json();
          return data; 
    } catch (error) { // return the parsed data to the caller function
        console.error("Error: Something went wrong please try again.", error);
        return null; // just returning null if there is a failed request
    }
}