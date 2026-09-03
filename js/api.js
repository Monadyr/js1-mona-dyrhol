'use strict'

export const API_URL = 'https://v2.api.noroff.dev/square-eyes';
export let allMovies = [];

export async function fetchMovies(){
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



