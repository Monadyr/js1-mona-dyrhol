"use strict";
// --- IMPORT ---
import { API_URL, allMovies, fetchMovies } from "./api.js";
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
movieSection.addEventListener("click", (event) => {
  const movieCard = event.target.closest(".movie-card");

  const movieId = movieCard.dataset.id;

  window.location.href = `product-detail.html?id=${movieId}`;
});
// --- CALL ---
async function renderCategoryPage() {
  try {
    await fetchMovies();
    loadCartFromStorage();

    const params = new URLSearchParams(window.location.search);
    const genre = params.get("genre");
    const matchGenre = genreMatch(genre);
    titleGenre.textContent = genre.toLocaleUpperCase();

    renderMovies(matchGenre, movieSection);

    footerYear();
  } catch (error) {
    console.log("her er det feil, " + error);
  }
}
renderCategoryPage();
