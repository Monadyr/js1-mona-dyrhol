"use strict";

import { loadCartFromStorage, fetchCart, removeFromCart } from "./render-cart.js";
import { footerYear } from "./footer.js";
// --- DOM ---
const cartList = document.querySelector(".cart-list");
const subTotal = document.getElementById('subtotal');
const shipping = document.getElementById('shipping');
const total = document.getElementById('total');
// --- FUNCTION ---
function getCart(){
  const cart = fetchCart();

  cart.forEach((movie) => {
    const movieCard = document.createElement("article");
    movieCard.classList.add("movie-card");

    const img = document.createElement("img");
    img.src = movie.image.url;
    img.alt = movie.image.alt;

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");
    const movieData = document.createElement("div");
    movieData.classList.add("movie-data");

    const title = document.createElement("h3");
    title.textContent = "Movie: " + movie.title;

    const price = document.createElement("p");
    price.classList.add("card-price");
    price.textContent = "kr. " + movie.price;

    const discountedPrice = document.createElement("p");
    discountedPrice.classList.add("card-discounted-price");
    discountedPrice.textContent = "kr. " + movie.discountedPrice;

    const onSale = movie.onSale;

    const quantity = document.createElement("span");
    quantity.textContent = "Quantity: " + movie.quantity;

    if (!onSale) {
      discountedPrice.textContent = "";
    } else {
      price.classList.add("on-sale");
    }

      movieInfo.appendChild(title);
      movieInfo.appendChild(price);
      movieInfo.appendChild(discountedPrice);

      movieData.appendChild(img);
      movieData.appendChild(movieInfo);

      movieCard.appendChild(movieData);
      movieCard.appendChild(quantity);

      cartList.appendChild(movieCard);
  })
}
console.log(fetchCart())

function priceSummary(){
  const cart = fetchCart()
  subTotal = cart
}
// --- EVENT LISTENER ---

// --- CALL ---
async function startSite() {
  try {
    await fetchCart()
    loadCartFromStorage()
    
    footerYear();
  } catch (error) {
    console.log("failed", error);
  }
}
startSite();
getCart()