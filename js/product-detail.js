"use strict";

// ---IMPORT---
import { API_URL, allMovies, fetchMovies } from "./api.js";
import { renderMovies } from "./render.js";
import { loadCartFromStorage, addToCart } from "./render-cart.js";
import { footerYear } from "./footer.js";

// --- DOM ---
const productDetailInfo = document.querySelector(".product-detail-info");
const movieSection = document.querySelector(".movie-section");
const cartCount = document.getElementById("cartCount");

// --- FUNCTIONS ---
/**
 * Render the movie info.
 */
function selectedMovie(movie) {
  productDetailInfo.innerHTML = "";

  if (!movie) {
    productDetailInfo.innerHTML = "<p>Woops... No movie was found</p>";
    return;
  }

  const image = document.createElement("img");
  image.src = movie.image.url;
  image.alt = movie.image.alt;

  const infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  const movieData = document.createElement("div");
  movieData.classList.add("movie-data");

  const title = document.createElement("h1");
  title.textContent = movie.title;

  const genre = document.createElement("p");
  genre.textContent = movie.genre;

  const rating = document.createElement("p");
  rating.textContent = ` ${movie.rating}`;

  const released = document.createElement("p");
  released.textContent = movie.released;

  const description = document.createElement("p");
  description.textContent = movie.description;

  const priceData = document.createElement("div");
  priceData.classList.add("price-data");

  const onSale = movie.onSale;

  const price = document.createElement("p");
  price.classList.add("price");
  price.innerHTML = movie.price;

  const discountedPrice = document.createElement("p");
  discountedPrice.classList.add("discounted-price");
  discountedPrice.innerHTML = movie.discountedPrice;

  const button = document.createElement("button");
  button.id = "addToCartBtn";
  button.classList.add("add-to-cart-btn");
  button.textContent = "Add to cart";

  movieData.appendChild(genre);
  movieData.appendChild(rating);
  movieData.appendChild(released);

  priceData.appendChild(price);
  priceData.appendChild(discountedPrice);

  infoContainer.appendChild(title);
  infoContainer.appendChild(movieData);
  infoContainer.appendChild(description);
  infoContainer.appendChild(priceData);
  infoContainer.appendChild(button);

  productDetailInfo.appendChild(image);
  productDetailInfo.appendChild(infoContainer);

  if (!onSale) {
    discountedPrice.textContent = "";
    price.innerHTML = `<span>Price: kr. </span>${movie.price}`;
  } else {
    price.classList.add("on-sale");
    discountedPrice.innerHTML = `<span>Now: kr. </span>${movie.discountedPrice}`;
    price.innerHTML = `<span>Before: kr. </span>${movie.price}`;
  }
  addToCart(movie, button);
}

function genreMatch(genre) {
  return allMovies.filter((movie) => movie.genre === genre);
}

// --- EVENT LISTENER ---
/**
 * Movie category cards event listener.
 */
movieSection.addEventListener("click", (event) => {
  const movieCard = event.target.closest(".movie-card");

  const movieId = movieCard.dataset.id;

  window.location.href = `product-detail.html?id=${movieId}`;
});

// --- CALL ---

async function startSite() {
  try {
    await fetchMovies();

    loadCartFromStorage();

    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");

    const movie = allMovies.find((movie) => movie.id === movieId);

    selectedMovie(movie);

    const matchingMovies = genreMatch(movie.genre);

    renderMovies(matchingMovies, movieSection);

    footerYear();
  } catch (error) {
    console.log("failed", error);
  }
}
startSite();
