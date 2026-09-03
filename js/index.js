'use strict';
// IMPORT
import {API_URL, allMovies, fetchMovies} from "./api.js";
import {renderMovies} from "./render.js";


// --- DOM ---
const movieSection = document.querySelectorAll(".movie-section");
const trendingMovies = document.getElementById('trending-movies');
const newReleases = document.getElementById('new-releases');
const categorySection = document.getElementById('category-section');
// --- FUNCTIONS ---

function fetchCategories(){
  const fetchGenre = allMovies.flatMap((movie) => movie.genre);
  const selectGenre = [...new Set(fetchGenre)];

  return selectGenre.sort();
}

function createCategories(){
  categorySection.innerHTML = "";
    try{
      const genres = fetchCategories();
      
        for( let i = 0; i < genres.length; i++){
          const uniqueGenre = document.createElement('article');
          uniqueGenre.classList.add(genres[i])
          const uniqueId = document.createElement('a');
          const uniqueTitle = document.createElement('h3');

          uniqueTitle.textContent = genres[i];
          uniqueId.href = `category-specific.html?genre=${genres[i]}`;


          uniqueId.appendChild(uniqueTitle)
          uniqueGenre.appendChild(uniqueId)
          categorySection.appendChild(uniqueGenre)
        }
    }catch(error){
      console.log(error)
      categorySection.innerHTML = '<p>Could not load categories.</p>';
    }
}

// --- EVENT LISTENER ---
movieSection.forEach((movieSection)=>{
movieSection.addEventListener('click', function(event){
  const movieCard = event.target.closest('.movie-card');
  
  const movieId = movieCard.dataset.id;

  window.location.href = `product-detail.html?id=${movieId}`

})
})
// --- CALL ---

async function startSite() {
  try{
    await fetchMovies();

    const trending = allMovies.filter(movie => movie.rating >= 8)
    const newMovies = allMovies.filter(movie => movie.released > 2019)

    renderMovies(trending, trendingMovies);
    renderMovies(newMovies, newReleases);

    createCategories();
  }catch(error){
    console.log("failed", error)
  }
}
startSite()
