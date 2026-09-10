"use strict";

import { loadCartFromStorage, fetchCart} from "./render-cart.js";
import { footerYear } from "./footer.js";
// --- DOM ---
const cartList = document.querySelector(".cart-list");
const subTotal = document.getElementById('subtotal');
const shipping = document.getElementById('shipping');
const total = document.getElementById('total');
const country = document.getElementById('country');
const buyBtn = document.querySelector('.buy-btn');
const checkoutForm = document.getElementById('checkout-form')
// --- FUNCTION ---
/**
 * render cart from local storage and place on page
 */
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
    title.textContent = movie.title;

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
/**
 * Estimate shipping cost based on country
 */
const typeCountry = document.getElementById('typeCountry')
function shippingAddress(){
  const shippingRates = {
      norway: 0,
      sweden: 50,
      denmark: 50,
      finland: 50,
      default: 200
    };

  const countryName = country.value;
    typeCountry.hidden = true;
    typeCountry.required = false;
  if(countryName === ""){
      return 0;
    }

    if(countryName === "other"){
      typeCountry.hidden = false;
      typeCountry.required = true;
    }

  return shippingRates[countryName] ?? shippingRates.default;
}
/**
 * Calculate price from products, shipping to total price. 
 */

function priceSummary(){
  let cart = fetchCart()
  let shippingCost = shippingAddress()
  
  let totalSub = 0

  cart.forEach((product) => {
    if(product.onSale){
      totalSub += product.discountedPrice * product.quantity;
    }else{
      totalSub += product.price * product.quantity;
    }
  })
  const priceTotal = totalSub + shippingCost;

  subTotal.textContent = `Kr. ${totalSub.toFixed(2)}`;
  shipping.textContent = `Kr. ${shippingCost.toFixed(2)}`;
  total.textContent = `Kr. ${priceTotal.toFixed(2)}`
}

// --- EVENT LISTENER ---
country.addEventListener('change', () => {
  priceSummary();
})
/**
 * Submit order, remove product from localStorage, and save the order in sessionStorage to render on confirmation page.
 */
checkoutForm.addEventListener('submit', (event)=>{
  event.preventDefault();

  const cart = fetchCart();

  sessionStorage.setItem('order', JSON.stringify(cart));
  localStorage.removeItem('cart')
  
  window.location.href = './confirmation/index.html';
})
// --- CALL ---
function startSite() {
  try {
    getCart()
    loadCartFromStorage()
    priceSummary()
    footerYear();
  } catch (error) {
    console.log("failed", error);
    cartList.innerHTML='<p class="error-msg">Something went wrong, please try again later.</p>'
  }
}
startSite();
