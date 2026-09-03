'use strict'
 // --- IMPORT ---
import {API_URL, allMovies, fetchMovies} from "./api.js";
import {renderMovies} from "./render.js";

const movieSection = document.querySelector('.movie-section')
const titleGenre = document.getElementById('title-genre')

function genreMatch(genre){
  
  return allMovies.filter((movie) => movie.genre === genre)
  
}

async function renderCategoryPage() {
  try{
    await fetchMovies()
    
    const params = new URLSearchParams(window.location.search);
    const genre = params.get("genre");
    const matchGenre = genreMatch(genre);
    titleGenre.textContent = genre;

    renderMovies(matchGenre, movieSection)
    
    

  }catch(error){
    console.log("her er det feil, " + error)
  }
}
renderCategoryPage()

