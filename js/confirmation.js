"use strict";

import { footerYear } from "./footer.js";

const displayOrder = document.getElementById('displayOrder')

let order = []

/**
 * Fetch order values from sessionStorage 
 */
function fetchOrder(){
  let loadOrder = sessionStorage.getItem('order');

  if(loadOrder){
    order = JSON.parse(loadOrder);
  }
  return order;
}
/**
 * Create order card to display on page
 */
function renderOrder(){
  const display = fetchOrder();

  display.forEach((movie) =>{
    const movieCard = document.createElement('article');
    movieCard.classList.add("movie-card");

    const img = document.createElement("img");
    img.src = movie.image.url;
    img.alt = movie.image.alt;

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const quantity = document.createElement("span");
    quantity.textContent = "Quantity: " + movie.quantity;

    movieCard.appendChild(img)
    movieCard.appendChild(title)
    movieCard.appendChild(quantity)

    displayOrder.appendChild(movieCard)
  })
}
renderOrder()
footerYear()