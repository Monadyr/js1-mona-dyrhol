'use strict'

const cartCount = document.getElementById('cartCount');

let cart = [];
/**
 * create quantity of cart
 */
function updateCartQuantity(){
  if(!cartCount) return;

  let cartQuantity = 0;
    
    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    })
    cartCount.textContent = cartQuantity;
}
/**
 * fetch cart quantity and call
 */
export function loadCartFromStorage(){
  const loadCart = localStorage.getItem('cart');

  if(loadCart){
    cart = JSON.parse(loadCart);
  }
  updateCartQuantity();
}
/**
 * save cart to localStorage
 */
function saveCartToStorage(){
  try{
   localStorage.setItem('cart', JSON.stringify(cart));
  }catch(error){
    console.log(error)
  }
}

/**
 * Button for add to cart that is called in selectedMovie() in product-detail.js.
 */
export function addToCart(movie, button){
  button.addEventListener('click', () =>{

    button.classList.add('clicked-btn');
    button.innerHTML = 'Added to cart';
    
    const matchingItem = cart.find(item => item.id === movie.id);

    if(matchingItem){
      matchingItem.quantity += 1;
    }else{
      cart.push({
        id: movie.id,
        title: movie.title,
        image: movie.image,
        price: movie.price,
        discountedPrice: movie.discountedPrice,
        quantity: 1
    });
    }

    updateCartQuantity();
    saveCartToStorage();
  });
}

/**
 * Fetch cart from localStorage
 */
export function fetchCart(){
  const getCart = localStorage.getItem('cart')

  if(getCart){
    cart = JSON.parse(getCart)
  }
  return cart;
}

/**
 * Remove item from cart and call it in button.addEventListener() in checkout.js.
 */
export function removeFromCart(movieId, movieCard, cartQuantity, cartList){
const matchingMovie = cart.find(movie => movie.id == movieId);  

if(matchingMovie.quantity > 1){
  matchingMovie.quantity -= 1;
  cartQuantity.textContent = 'Quantity: ' + matchingMovie.quantity;
}else{
  cart = cart.filter(movie => movie.id !== movieId);
  movieCard.remove();
}
if(!cart.length){
  cartList.innerHTML = '<p class="cart-text">All item has been removed</p>'
}

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartQuantity();
}
