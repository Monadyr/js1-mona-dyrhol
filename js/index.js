'use strict';
// IMPORT
import {API_URL, allMovies, fetchMovies} from "./api.js";
import {renderMovies} from "./render.js";
import {loadCartFromStorage} from "./cart.js";
import { footerYear } from "./footer.js";

// --- DOM ---
const movieSection = document.querySelectorAll(".movie-section");
const trendingMovies = document.getElementById('trending-movies');
const newReleases = document.getElementById('new-releases');
const categorySection = document.getElementById('category-section');
const browseBtn = document.getElementById('browse-btn')
// --- FUNCTIONS ---
/**
 * Fetch movie api categories
 */
function fetchCategories(){
  const fetchGenre = allMovies.flatMap((movie) => movie.genre);
  const selectGenre = [...new Set(fetchGenre)];

  return selectGenre.sort();
}
/**
 * Create categories card
 */
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
      categorySection.innerHTML = '<p class="error-msg">Could not load categories. Try again later.</p>';
    }
}

// --- EVENT LISTENER ---
movieSection.forEach((movieSection)=>{
movieSection.addEventListener('click', function(event){
  const movieCard = event.target.closest('.movie-card');
  
  const movieId = movieCard.dataset.id;

  window.location.href = `product-detail.html?id=${movieId}`;
})
})

browseBtn.addEventListener('click', () =>{
  browseBtn.classList.add('clicked');
  window.location.href = './products.html'

})

// --- CALL ---

async function startSite() {
  try{
    await fetchMovies();
    loadCartFromStorage();

    const trending = allMovies.filter(movie => movie.rating >= 8)
    const newMovies = allMovies.filter(movie => movie.released > 2019)

    renderMovies(trending, trendingMovies);
    renderMovies(newMovies, newReleases);

    createCategories();
    footerYear()
  }catch(error){
    console.log("failed", error)
  }
}
startSite()
