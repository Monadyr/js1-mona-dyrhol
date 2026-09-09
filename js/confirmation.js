"use strict";

import { loadCartFromStorage, fetchCart} from "./render-cart.js";
import { footerYear } from "./footer.js";

const displayOrder = document.getElementById('displayOrder')

let order = []


function fetchOrder(){
  let loadOrder = sessionStorage.getItem('order');

  if(loadOrder){
    order = JSON.parse(loadOrder);
  }
  console.log(order)
  return order;
}

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