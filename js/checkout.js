'use strict'
import {API_URL, allMovies, fetchMovies} from "./api.js";
import {renderMovies} from "./render.js";
import {loadCartFromStorage, fetchCart, removeFromCart} from "./cart.js";
import { footerYear } from "./footer.js";

const cartList = document.querySelector('.cart-list')

/**
 * Display cart list on page
 */
function displayCart(){
  const cart = fetchCart()
  if(cart.length === 0){
    cartList.innerHTML = '<p class="cart-text">Cart is empty, go back and add products</p>';
    return
  }

  cart.forEach((movie)=> {
    const movieCard = document.createElement('article');
    movieCard.classList.add('movie-card');

    const link = document.createElement('a');
    link.href =`product-detail.html?id=${movie.id}`;

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

    const discountedPrice = document.createElement('p');
    discountedPrice.classList.add('card-discounted-price')
    discountedPrice.textContent ='kr. ' +  movie.discountedPrice;

    const onSale = movie.onSale;

    const quantity = document.createElement('span');
    quantity.textContent ='Quantity: ' + movie.quantity;

    const button = document.createElement('button');
    button.classList.add('remove-btn');
    button.textContent = 'Remove';
    
    
    link.appendChild(title);
    link.appendChild(price);
    link.appendChild(discountedPrice);
    movieInfo.appendChild(link);
    
    movieData.appendChild(img);
    movieData.appendChild(movieInfo);

    movieCard.appendChild(movieData);
    movieCard.appendChild(quantity);
    movieCard.appendChild(button)

    cartList.appendChild(movieCard);

     if(!onSale){
      discountedPrice.textContent= ""
    }else{
      price.classList.add('on-sale')
    }

  button.addEventListener('click', ()=> {
    
      removeFromCart(movie.id, movieCard, quantity, cartList)
  });
  });
}


// --- CALL ---
async function startSite() {
  try{
    await fetchMovies();
    loadCartFromStorage();
    displayCart()
    footerYear()
  }catch(error){
    console.log("failed", error)
  }
}
startSite()