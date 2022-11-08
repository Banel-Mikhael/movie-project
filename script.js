'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");

const onFilterClick = async(e) => {
  let filetrTarget = e.target.innerText
  filetrTarget = filetrTarget.toLowerCase();
  filetrTarget = filetrTarget.replace(" ", "_")
  console.log(filetrTarget)
  // sessionStorage.setItem('filter', filetrTarget)
  // window.location.reload();
  const filteredMovies = await fetchMovies(filetrTarget)
  renderMovies(filteredMovies.results)
}

// Don't touch this function please
const autorun = async () => {
  // if (!sessionStorage.getItem('filter'))
  //   sessionStorage.setItem('filter', 'now_playing')
  // const movies = await fetchMovies(sessionStorage.getItem('filter'));
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// const constructSearch=(path,titleSearch)=>{
//   return `${TMDB_BASE_URL}/${path}/movie?api_key=###&query=${titleSearch}`
// }

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const movieCredits = await fetchMovie(movie.id + "/credits");
  const movieTrailer = await fetchMovie(movie.id + "/videos");
  const movieSimilar = await fetchMovie(movie.id + "/similar");
  renderMovie(movieRes, movieCredits, movieTrailer.results, movieSimilar.results);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async (movieFilter = "now_playing") => {
  const url = constructUrl(`movie/${movieFilter}`);
  const res = await fetch(url);
  return res.json();
};


// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  console.log( movies)
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute('class', 'lg:ml-10 bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 text text-2xl text-center max-w-sm rounded overflow-hidden shadow-lg cursor-pointer')
    movieDiv.innerHTML = `
    <img class="w-full" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="Sunset in the mountains">
  <div class="px-2 py-2">
    <div class="font-bold text-xl mb-2">${movie.title}</div>
  
  </div>
  
        `;

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, movieCast) => {
  CONTAINER.setAttribute('class', `grid grid-cols-3 grid-rows-3 min-h-screen  text-black`)
  CONTAINER.style.background = `linear-gradient(rgb(255 255 255 / 90%), rgb(255 255 255 / 40%)), url(${BACKDROP_BASE_URL + movie.backdrop_path}) no-repeat `
  CONTAINER.style.backgroundSize = "cover"

  CONTAINER.innerHTML = `

  <div>
   ${movie.original_language}
  </div>
        <div class="col-start-2 col-end-4 row-start-2 ">
            <h2 id="movie-title" class="text-[50px]">${movie.title}</h2>
            <p id="movie-release-date" class="pt-[30px]"><b>Release Date:</b> ${movie.release_date
    }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
       
        </div>
            <h3 class="col-span-3 row-start-3 text-[30px] pl-[50px] " >Actors: <ul class="actorList"> </ul></h3>
       
      `;
  const actorList = document.querySelector(".actorList")

  actorList.setAttribute('class', 'flex flex-row justify-center pt-[100px] gap-x-[12px]')

  movieCast.cast.slice(0, 5).forEach(actor => {
    const actorCast = document.createElement("li");
    actorCast.innerHTML = `${"'" + actor.name + "'"}`
    actorList.appendChild(actorCast);
    console.log(actor)
  })
  console.log(movieCast)
  // for (let i=0;i<=5;i++){
  //   const actor =document.createElement("li");
  //   actor.innerHTML=`${"'"+movieCast.cast[i].profile_path+"'"}`
  //   actorList.appendChild(actor);
  //   console.log(movieCast.cast[i]) 
  // }


};

document.addEventListener("DOMContentLoaded", autorun);