'use strict'
import {API_URL, allMovies, fetchMovies} from "./api.js";
import {renderMovies} from "./render.js";
import {loadCartFromStorage, fetchCart, removeFromCart} from "./cart.js";

const cartList = document.querySelector('.cart-list')

/**
 * Display cart list on page
 */
function displayCart(){
  const cart = fetchCart()

  cartList.innerHTML = "";

  cart.forEach((movie)=> {
    const movieCard = document.createElement('article');
    movieCard.classList.add('movie-card');

    const img = document.createElement('img');
    img.src = movie.image.url;
    img.alt = movie.image.alt;

    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    const movieData = document.createElement('div');
    movieData.classList.add('movie-data');

    const title = document.createElement('h3');
    title.textContent ='Movie: ' + movie.title;

    const price = document.createElement('p');
    price.classList.add('card-price')
    price.textContent ='kr. ' +  movie.price;

    const quantity = document.createElement('span');
    quantity.textContent ='Quantity: ' + movie.quantity;

    const button = document.createElement('button');
    button.classList.add('remove-btn');
    button.textContent = 'Remove';
    
    movieInfo.appendChild(title);
    movieInfo.appendChild(price);
    
    movieData.appendChild(img);
    movieData.appendChild(movieInfo);

    movieCard.appendChild(movieData);
    movieCard.appendChild(quantity);
    movieCard.appendChild(button)

    cartList.appendChild(movieCard);


  button.addEventListener('click', ()=> {
    removeFromCart(movie.id);
  });

  });
  
}



// --- CALL ---
async function startSite() {
  try{
    await fetchMovies();
    loadCartFromStorage();
    displayCart()

  }catch(error){
    console.log("failed", error)
  }
}
startSite()