"use strict";
// --- IMPORT ---
import { allMovies, fetchMovies } from "./api.js";
import { renderMovies } from "./render.js";
import { loadCartFromStorage } from "./render-cart.js";
import { footerYear } from "./footer.js";
// --- STATE ---
let selectedGenres = [];
// --- DOM ---
const movieSection = document.querySelector(".movie-section");
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");
const sortReleased = document.getElementById("sortReleased");
const sortRating = document.getElementById("sortRating");
const checkboxEl = document.getElementById("checkboxEl");

// --- FUNCTION ---
/**
 * Filter the movie options
 */
function filterContainer(items, sortOption) {
  const selectItems = [...items];
  switch (sortOption) {
    case "released-new":
      selectItems.sort((a, b) => b.released - a.released);
      break;
    case "released-old":
      selectItems.sort((a, b) => a.released - b.released);
      break;
  }
  switch (sortOption) {
    case "rating-high":
      selectItems.sort((a, b) => b.rating - a.rating);
      break;
    case "rating-low":
      selectItems.sort((a, b) => a.rating - b.rating);
      break;
  }

  return selectItems;
}
/**
 * Find the movies genres.
 * @returns
 */
function matchGenre() {
  const genreMatch = allMovies.flatMap((movie) => movie.genre);
  const uniqueGenres = [...new Set(genreMatch)];

  return uniqueGenres.sort();
}

/**
 * Creating checkboxes for the movie genres.
 */
function createGenreCheckbox() {
  checkboxEl.innerHTML = "";

  const genres = matchGenre();

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];

    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = genre;

    const label = document.createElement("label");
    label.textContent = genre;

    label.appendChild(input);

    checkboxEl.appendChild(label);

    // event listener inside the function
    input.addEventListener("change", () => {
      if (input.checked) {
        selectedGenres.push(genre);
      } else {
        selectedGenres = selectedGenres.filter(
          (selectedGenres) => selectedGenres !== genre,
        );
      }
      renderPage();
    });
  }
}

/**
 * Render the page with filter options
 */
function renderPage(sortOption = sortReleased.value) {
  let movies = [...allMovies];

  if (selectedGenres.length > 0) {
    movies = movies.filter((movie) => selectedGenres.includes(movie.genre));
  }

  movies = filterContainer(movies, sortOption);

  renderMovies(movies, movieSection, 'product/index.html');
}

// --- EVENT LISTENER ---
filterBtn.addEventListener("click", () => {
  filterMenu.classList.toggle("open");
});

sortReleased.addEventListener("change", () => {
  renderPage(sortReleased.value);
});
sortRating.addEventListener("change", () => {
  renderPage(sortRating.value);
});

// --- CALL ---
async function startSite() {
  movieSection.innerHTML = '<div class="spinner" role="status" aria-live="polite"></div>'

  try {
    await fetchMovies();
    loadCartFromStorage();
    renderPage();
    createGenreCheckbox();
    footerYear();
  } catch (error) {
    console.log("dette er feil " + error);
  }
}
startSite();
