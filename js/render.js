'use strict'
/**
 * Movie card
 */
export function renderMovies(moviesToRender, movieSection){

   movieSection.innerHTML = "";

    if(moviesToRender.length === 0){
    movieSection.innerHTML = '<p>Woops... No movies were found</p>';
    return;
   }

   moviesToRender.forEach((movie) => {
      const movieCard = document.createElement('article');
      movieCard.classList.add('movie-card');
      movieCard.dataset.id = movie.id;

      const link = document.createElement('a');
      link.href =`product-detail.html?id=${movie.id}`;

      const image = document.createElement('img');
      image.src = movie.image.url;
      image.alt = movie.image.alt;

      const title = document.createElement('h3');
      title.textContent = movie.title;

      const movieData = document.createElement("div")
      movieData.classList.add('movie-data')

      const genre = document.createElement('p');
      genre.textContent = `🎬 ${movie.genre}`;

      const rating = document.createElement('p');
      rating.textContent = `⭐️ ${movie.rating}`;

      const price = document.createElement('p');
      price.classList.add('card-price')
      price.textContent ='kr. ' +  movie.price;

      const discountedPrice = document.createElement('p');
      discountedPrice.classList.add('card-discounted-price')
      discountedPrice.textContent ='kr. ' + movie.discountedPrice;

      const onSale = movie.onSale

      movieData.appendChild(genre);
      movieData.appendChild(rating)

      movieCard.appendChild(image);
      movieCard.appendChild(title);
      movieCard.appendChild(movieData);
      movieCard.appendChild(price);
      movieCard.appendChild(discountedPrice)

      link.appendChild(movieCard);
      movieSection.appendChild(link);          

   if(!onSale){
      discountedPrice.textContent= ""
   }else{
      price.classList.add('on-sale')
   }
   })
}


