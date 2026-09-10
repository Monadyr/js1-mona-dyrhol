"use strict";
// --- IMPORT ---
import { allMovies, fetchMovies } from "./api.js";
import { renderMovies } from "./render.js";
import { loadCartFromStorage } from "./render-cart.js";
import { footerYear } from "./footer.js";

const movieSection = document.querySelector(".movie-section");
const titleGenre = document.getElementById("title-genre");
// --- FUNCTION ---
/**
 * Fetch api categories movies
 */
function genreMatch(genre) {
  return allMovies.filter((movie) => movie.genre === genre);
}
// --- EVENT LISTENER ---

// --- CALL ---
async function renderCategoryPage() {
  movieSection.innerHTML='<div class="spinner" role="status" aria-live="polite"></div>';
  try {
    await fetchMovies();
    loadCartFromStorage();

    const params = new URLSearchParams(window.location.search);
    const genre = params.get("genre");
    const matchGenre = genreMatch(genre);
    titleGenre.textContent = genre.toLocaleUpperCase();

    renderMovies(matchGenre, movieSection,'../product/index.html');

    footerYear();
  } catch (error) {
    movieSection.innerHTML = '<p id="catch-error">Something went wrong.. Please try again later.</p>';

  }
}
renderCategoryPage();
