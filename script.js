'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const API_KEY = "api_key=542003918769df50083a13c415bbc602"
const API_URL = TMDB_BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY
const CONTAINER = document.querySelector(".container");
const genreList = document.querySelector(".genreDropDown");

let genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]
let selectedGenre = [];

const genreSelector = () => {
  genreList.innerHTML = ''
  genres.forEach((genre) => {
    const genreItem = document.createElement("li")
    genreItem.setAttribute("class", "block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white")
    genreItem.id = genre.id
    genreItem.innerText = genre.name
    genreItem.addEventListener("click", () => {

      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id)
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectedGenre.splice(index, 1);
            }
          })
        } else {
          selectedGenre.push(genre.id)
        }
      }
      console.log(selectedGenre)
      // sessionStorage.setItem('filter', selectedGenre)
      // window.location.reload();
      const genredMovies = API_URL + "&with_genres=" + encodeURI(selectedGenre.join(","));
      renderMovies(fetchgenre(genredMovies))
    })
    genreList.appendChild(genreItem)
  })
}
genreSelector();

const onFilterClick = async (e) => {
  let filetrTarget = e.target.innerText
  filetrTarget = filetrTarget.toLowerCase();
  filetrTarget = filetrTarget.replace(" ", "_")
  sessionStorage.setItem('filter', filetrTarget)
  window.location.reload();
  const filteredMovies = await fetchMovies(filetrTarget)
  renderMovies(filteredMovies.results)
}

// Don't touch this function please
const autorun = async () => {
  if (!sessionStorage.getItem('filter'))
    sessionStorage.setItem('filter', 'now_playing')
  const movies = await fetchMovies(sessionStorage.getItem('filter'));
  // const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const movieCredits = await fetchMovie(movie.id + "/credits");
  const movieTrailer = await fetchMovie(movie.id + "/videos");
  const movieSimilar = await fetchMovie(movie.id + "/similar");
  renderMovie(movieRes, movieCredits, movieTrailer.results, movieSimilar.results);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.

const fetchMovies = async (movieFilter) => {
  const url = constructUrl(`movie/${movieFilter}`);
  const res = await fetch(url);
  return res.json();
};

const fetchgenre = async (url) => {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      renderMovies(data.results)
    })
}

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  // console.log( movies)
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute('class', ' lg:ml-10 bg-gradient-to-r  from-blue-100 hover:opacity-[50%] via-blue-300 to-blue-500 text text-2xl text-center max-w-sm rounded overflow-hidden shadow-lg cursor-pointer')
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
const renderMovie = (movie, movieCast, videos, similar) => {
  CONTAINER.setAttribute('class', `grid grid-cols-3 grid-rows-3 min-h-screen  text-black`)
  CONTAINER.style.background = `linear-gradient(rgb(255 255 255 / 90%), rgb(255 255 255 / 40%)), url(${BACKDROP_BASE_URL + movie.backdrop_path}) no-repeat `
  CONTAINER.style.backgroundSize = "cover"

  CONTAINER.innerHTML = `

  <div>
  <iframe class="col-statrt-1 col-end-2  h-[400px] w-[400px] border-2 pt-[20px] pl-[20px] rounded-br-[30%] rounded-tl-[30%]" src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key : videos[0].key}" 
  frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
   allowfullscreen></iframe>;
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
    // let castImgUrl = actor.profile_path
    // console.log("hola senior", castImgUrl)
    const actorCastDiv = document.createElement("div");
    actorCastDiv.setAttribute("class","pl-[100px] cursor-pointer")

    actorCastDiv.innerHTML = `
   <img class="rounded-[30%] h-[125px] w-[12 5px]" src="${PROFILE_BASE_URL+ actor.profile_path}" > 
    <p>${actor.name} </p> `

    actorList.appendChild(actorCastDiv);
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