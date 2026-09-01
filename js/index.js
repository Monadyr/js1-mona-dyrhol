'use strict';
// STATE
const API_URL = 'https://v2.api.noroff.dev/square-eyes';
let allMovies = [];

// --- DOM ---
const movieSection = document.querySelectorAll(".movie-section");
const trendingMovies = document.getElementById('trending-movies');
const newReleases = document.getElementById('new-releases');
const categorySection = document.getElementById('category-section');
// --- FUNCTIONS ---
async function fetchMovies(){
  try {
    const response = await fetch(API_URL);
    if(!response.ok){
      throw new Error(`API Error! Status ${response.status}`);
    }
    const result = await response.json();
    allMovies = result.data;
  }catch(error){
    console.log(error);
  }
}

function renderMovies(moviesToRender, movieSection){
   movieSection.innerHTML = "";

    if(moviesToRender.length === 0){
    movieSection.innerHTML = '<p>Woops... No movies were found</p>';
    console.log(trending)
    return;
   }

   moviesToRender.forEach((movie) => {
    const movieCard = document.createElement('article');
    movieCard.classList.add('movie-card');
    movieCard.dataset.id = movie.id;

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
    price.textContent = movie.price;

    movieData.appendChild(genre);
    movieData.appendChild(rating)

    movieCard.appendChild(image);
    movieCard.appendChild(title);
    movieCard.appendChild(movieData);
    movieCard.appendChild(price);

    movieSection.appendChild(movieCard)
   })
}

function fetchCategories(){
  const fetchGenre = allMovies.flatMap((movie) => movie.genre);
  const selectGenre = [...new Set(fetchGenre)];

  return selectGenre.sort();
}

function createCategories(){
  categorySection.innerHTML = "";
    try{
      const genres = fetchCategories();
      
        for( let i = 0; i < genres.length; i++){
          const uniqueGenre = document.createElement('article');
          uniqueGenre.classList.add(genres[i])
          const uniqueId = document.createElement('a');
          const uniqueTitle = document.createElement('h3');

          uniqueTitle.textContent = genres[i];
          uniqueId.href = `category-specific.html?genre=${genres[i]}`;


          uniqueId.appendChild(uniqueTitle)
          uniqueGenre.appendChild(uniqueId)
          categorySection.appendChild(uniqueGenre)
        }
    }catch(error){
      console.log(error)
      categorySection.innerHTML = '<p>Could not load categories.</p>';
    }
}

// --- EVENT LISTENER ---
movieSection.forEach((movieSection)=>{
movieSection.addEventListener('click', function(event){
  const movieCard = event.target.closest('.movie-card');
  
  const movieId = movieCard.dataset.id;

  window.location.href = `product-detail.html?id=${movieId}`

})
})
// --- CALL ---

async function startSite() {
  try{
    await fetchMovies();

    const trending = allMovies.filter(movie => movie.rating >= 8)
    const newMovies = allMovies.filter(movie => movie.released > 2019)

    renderMovies(trending, trendingMovies);
    renderMovies(newMovies, newReleases);

    createCategories();
  }catch(error){
    console.log("failed", error)
  }
}
startSite()
