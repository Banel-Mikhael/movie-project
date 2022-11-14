'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const API_KEY = "api_key=542003918769df50083a13c415bbc602"
const API_URL =TMDB_BASE_URL+"/discover/movie?sort_by=popularity.desc&" + API_KEY
const CONTAINER = document.querySelector(".container");
const genreList = document.querySelector(".genreDropDown");
const actorListButton=document.querySelector(".actorsList")
const sliderCont=document.querySelector(".sliderContainer")
sliderCont.setAttribute("class","dark:bg-slate-800")
const slideSection =document.querySelector(".slider")


// to choose genres (horror, romantic ...etc)
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
    genreItem.addEventListener("click", (e) => {
      e.preventDefault();
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
      
       const genredMovies = API_URL + "&with_genres=" + encodeURI(selectedGenre.join(","));

       sessionStorage.setItem('filter', genredMovies)
       sessionStorage.setItem('isFullUrl', 1)
       window.location.reload();
    })
    genreList.appendChild(genreItem)
  })
}
genreSelector();
// to choose movies(latest,popular,top rated ...etc)
const onFilterClick = async (e) => {
  
  let filetrTarget = e.target.innerText;
  filetrTarget = filetrTarget.split(" ").join("_").toLowerCase();
  sessionStorage.setItem('filter', filetrTarget);
  sessionStorage.setItem('isFullUrl', 0);
  window.location.reload();
  // const filteredMovies = await fetchMovies(filetrTarget)
  // renderMovies(filte redMovies.results)
}
// About button to go plus design whole about page
const onAboutClick =()=>{
  CONTAINER.setAttribute("class","grid grid-cols-2 grid-rows-2")
  CONTAINER.style.background = `linear-gradient(rgb(255 255 255 / 90%), rgb(255 255 255 / 40%)), url(https://wallpaperaccess.com/full/767353.jpg) no-repeat `
  sliderCont.innerHTML=""
  CONTAINER.innerHTML=` <figure class="col-start-1 col-end-3 bg-slate-100 p-8 md:p-0 dark:bg-slate-800 text-white">
  <img class="w-[10px] h-8 md:w-48 md:h-auto md:rounded-[50%] rounded-full mx-auto" src="/Banel Mikhael_Iraq_2022.jpg" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
      A highly motivated person, I like to work in a place with a positive, dynamic, and stable nature which has a healing atmosphere where I can use my experience and will inspire me to enhance my skills. 
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
       Banel Mikhael
      </div>
      <div class="text-slate-700 dark:text-slate-500">
       Front-End Developer/IT ,Duhok/Iraq
      </div>
    </figcaption>
  </div>
</figure> 
<figure class="  bg-slate-100 p-8 md:p-0 dark:bg-slate-800 text-white">
  <img class="w-[10px] h-8 md:w-48 md:h-auto md:rounded-[30%] rounded-full mx-auto" src="" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam doloremque molestiae numquam aliquid officia reprehenderit veniam enim quasi asperiores. At molestias similique perferendis nostrum voluptatum iusto numquam quas harum iste, aperiam nobis animi impedit ullam consequuntur voluptates repellendus quasi est labore rerum mollitia inventore non. Quidem dolore officiis voluptates!
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
      ANYONE
      </div>
      <div class="text-slate-700 dark:text-slate-500">
       JOB AND ANYWHERE
      </div>
    </figcaption>
  </div>
</figure> 
<figure class=" bg-slate-100 p-8 md:p-0 dark:bg-slate-800 text-white ">
  <img class="w-[10px] h-8 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src="" alt="" width="384" height="512">
  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint aperiam doloremque molestiae numquam aliquid officia reprehenderit veniam enim quasi asperiores. At molestias similique perferendis nostrum voluptatum iusto numquam quas harum iste, aperiam nobis animi impedit ullam consequuntur voluptates repellendus quasi est labore rerum mollitia inventore non. Quidem dolore officiis voluptates!
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        ANYONE
      </div>
      <div class="text-slate-700 dark:text-slate-500">
       ANYEHRE AND JOB
      </div>
    </figcaption>
  </div>
</figure> 
`
}
// home button to go to main page
const onHomeClick = () => {
  sessionStorage.setItem('filter', 'now_playing');
  sessionStorage.setItem('isFullUrl', 0);
  window.location.reload();
}
// Don't touch this function please
const autorun = async () => {
  if (!sessionStorage.getItem('filter'))
  {
    sessionStorage.setItem('filter', 'now_playing') 
    sessionStorage.setItem('isFullUrl', 0);
  }
  const movies = await fetchMovies();
  const actors =await fetchActors()
  // const movies = await fetchMovies();
  renderMovies(movies.results);
  renderActors(actors.results)
};
// construct url for actors page
const constructActorsUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
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
// to send info and show on pages
const actorDetails = async (actor) => {
  const actorRes = await fetchActors(actor.id);
  const actorCredits=await fetchActors(actor.id+"/movie_credits")
  renderActor(actorRes,actorCredits);
};
//  get actors from url
const fetchActors = async (actors="popular") => {
 let url =constructActorsUrl(`person/${actors}`)
  const res = await fetch(url);
  return res.json();
};
//  to get genres from url
const fetchgenre = async (url) => {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    renderMovies(data.results)
  })
}
// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const isFullUrl = parseInt(sessionStorage.getItem('isFullUrl'));
  const baseUrl = sessionStorage.getItem('filter');
  let url = isFullUrl ? baseUrl : constructUrl(`movie/${baseUrl}`);
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
  movies.slice(0,6).forEach((eachSlide,index)=>{
 const slideDiv=document.createElement("img")
 
 slideDiv.src=`${BACKDROP_BASE_URL + eachSlide.backdrop_path}`

//  console.log("this is bu6ish",`${BACKDROP_BASE_URL+eachSlide.backdrop_path}`)
 slideDiv.setAttribute("id",`slide-${index}`)
 slideSection.appendChild(slideDiv)
 slideDiv.addEventListener("click",()=>{
  sliderCont.innerHTML=""
  movieDetails(eachSlide);
 })

  })
  // console.log( movies)
  // movies.slice(0,18).forEach((movie)=>{})
  movies.slice(5,25).forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute('class', 'lg:ml-10 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 hover:opacity-[25%] text-2xl text-center max-w-sm rounded overflow-hidden shadow-lg cursor-pointer')
    movieDiv.setAttribute("style","div:hover{ content: 'ADD';}")
    movieDiv.innerHTML = `
    <img class="w-full" src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="Sunset in the mountains">
  <div class="px-2 py-2">
    <div class="font-bold text-xl mb-2">${movie.title}
    
    </div>
  
  </div>
  
        `;

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};
// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, movieCast, videos, similarMovies) => {
  CONTAINER.setAttribute('class', `grid grid-cols-3 grid-rows-3 min-h-screen  text-black`)
  CONTAINER.style.background = `linear-gradient(rgb(255 255 255 / 90%), rgb(255 255 255 / 40%)), url(${BACKDROP_BASE_URL + movie.backdrop_path}) no-repeat `
  CONTAINER.style.backgroundSize = "cover"
  
  CONTAINER.innerHTML = `
  <div>
  <iframe
      class="col-statrt-1 col-end-2  h-[400px] w-[400px] border-2 pt-[20px] pl-[20px] rounded-br-[30%] rounded-tl-[30%]"
      src="https://www.youtube.com/embed/${videos.length === 0 ? videos.key : videos[0].key}" frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>;
</div>
<div class="col-start-2 col-end-4 row-start-1 flex flex-col ">
<p class="directorName pt-[250px]  pl-[3px]"><b>Director :</b></p>
  <p class=" pl-[3px] "><span class="font-bold">Movie Language:</span>
      ${movie.original_language.toUpperCase()} </p>
  <p  class="whitespace-pre pl-[3px]"><b>Rating :</b>${movie.vote_average+"★"+"   "+"<b>Vote Count : </b>"+""+movie.vote_count}</p>
  
  <p class=" pl-[3px]"><b>Runtime:</b> ${movie.runtime} Minutes</p>
</div>
<div class="logoDiv col-start-1 col-end-2 row-start-2"> </div>
<div class="col-start-2 col-end-4 row-start-2 ">
  <h2 id="movie-title" class="text-[50px]">${movie.title}</h2>
  <h3>Overview:</h3>
  <p id="movie-overview">${movie.overview}</p>
</div>
<h3 class="col-span-3 row-start-3 text-[30px] pl-[50px] ">Actors: <ul class="actorList"> </ul>
</h3>
<div class="similar-movies lg:col-start-1 lg:col-end-5 lg:row-start-4 lg:flex pr-[30px]">
</div>
      `;


  movie.production_companies.slice(0, 1).forEach(movieLogo => {
    const directorP=document.querySelector(".directorName").innerHTML=`${"<b>Production Company :</b>"+" "+movieLogo.name}`
    const logoDiv = document.querySelector(".logoDiv")
    const createDiv = document.createElement("div")
    createDiv.innerHTML = `<img class=" h-[300px] w-[400px]  " src="${PROFILE_BASE_URL + movieLogo.logo_path}"> `

    logoDiv.appendChild(createDiv)

    // console.log(PROFILE_BASE_URL + movieLogo.logo_path)
  })
  const actorList = document.querySelector(".actorList")

  actorList.setAttribute('class', 'flex flex-row justify-center pt-[100px] gap-x-[12px]')

  movieCast.cast.slice(0, 5).forEach(actor => {
    // let castImgUrl = actor.profile_path
    // console.log("hola senior", castImgUrl)

    const actorCastDiv = document.createElement("div");
    actorCastDiv.setAttribute("class", "pl-[100px] cursor-pointer")
    actorCastDiv.innerHTML = `
   <img class="rounded-[30%] h-[125px] w-[12 5px]" src="${PROFILE_BASE_URL + actor.profile_path}" > 
    <p>${actor.name} </p> `

    actorList.appendChild(actorCastDiv);

    actorCastDiv.addEventListener("click",()=>{
    actorDetails(actor);      
      
    })

  })
  // console.log(movieCast)
  // for (let i=0;i<=5;i++){
  //   const actor =document.createElement("li");
  //   actor.innerHTML=`${"'"+movieCast.cast[i].profile_path+"'"}`
  //   actorList.appendChild(actor);
  //   console.log(movieCast.cast[i]) 
  // }
  similarMovies.slice(0, 6).forEach(singleMoive => {
    const similarMoviesDiv = document.querySelector(".similar-movies")
    const similarDiv = document.createElement("div")
    similarDiv.setAttribute("class", " w-[50%] h-[50%] mb-[200px] lg:ml-10 bg-gradient-to-r from-slate-500 to-yellow-100 hover:opacity-[25%] text-2xl text-center max-w-sm rounded overflow-hidden shadow-lg cursor-pointer")
    similarDiv.innerHTML = ` 
    <img class="w-full " src="${BACKDROP_BASE_URL + singleMoive.backdrop_path}" alt="">
     <div class="px-2 py-2">
       <div class="font-bold text-xl mb-2">${singleMoive.title}
       </div>
     </div>`
    similarMoviesDiv.appendChild(similarDiv)
    similarDiv.addEventListener("click", () => {
      movieDetails(singleMoive);
      // console.log(movieDetails(singleMoive))  
    })
  })
};
// function to show all actors 
const renderActors = (actors) => {
  // console.log( movies)
  // movies.slice(0,18).forEach((movie)=>{})
  actors.slice(0,18).forEach((actor) => {
    const actorDiv = document.createElement("div");
    actorDiv.setAttribute('class', 'lg:ml-10 bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 hover:opacity-[25%] text-2xl text-center max-w-sm rounded overflow-hidden shadow-lg cursor-pointer')
    actorDiv.setAttribute("style","div:hover{ content: 'ADD';}")
    actorDiv.innerHTML = `
    <img class="w-full" src="${PROFILE_BASE_URL + actor.profile_path}" alt="Sunset in the mountains">
  <div class="px-2 py-2">
    <div class="font-bold text-xl mb-2">${actor.name}
    
    </div>
  
  </div>
  
        `;

    actorListButton.addEventListener("click",()=>{

          CONTAINER.appendChild(actorDiv);
          
        })
    actorDiv.addEventListener("click", () => {
      
      actorDetails(actor);
     
    });
  
    
  });
};
// function to show single actor with all info required
const renderActor = (actor,actorCast) => {
  // console.log(actor)
  CONTAINER.setAttribute('class', `grid grid-cols-3 grid-rows-3 min-h-screen  text-black`)
  CONTAINER.style.background = `linear-gradient(rgb(255 255 255 / 90%), rgb(255 255 255 / 40%)), url(https://wallpaperaccess.com/full/164886.jpg) no-repeat `
  CONTAINER.style.backgroundSize = "cover"

  CONTAINER.innerHTML = `
  <div>
  <img class="col-statrt-1 col-end-2  h-[400px] w-[400px] border-2 pt-[20px] pl-[20px] rounded-br-[30%] rounded-tl-[30%]" src="${PROFILE_BASE_URL + actor.profile_path}" alt="Sunset in the mountains">
</div>

<div class="col-start-2 col-end-4 row-start-1 flex flex-col ">
 
  <p  class="pt-[300px] pl-[3px]"><b>Gender :</b> ${actor.gender ===2 ? "Male":"Female"}</p>
  
  <p class=" pl-[3px]"><b>popularity:</b> ${actor.popularity}</p>
  <p class=" pl-[3px]"><b>Birthday:</b> ${actor.birthday}</p>
  <p class=" pl-[3px]"><b>Death Day:</b> ${actor.deathday}</p>
  
</div>

<div class="col-start-2 col-end-4 row-start-2 ">
  <h2  class="text-[50px]">${actor.name}</h2>
  <h3>Overview:</h3>
  <p >${actor.biography}</p>
</div>
<h3 class="col-span-3 row-start-3 text-[30px]  ">Movies: <ul class="moviesActedIn"> </ul>
</h3>

      `;  

      const moviesActedInList = document.querySelector(".moviesActedIn")

      moviesActedInList.setAttribute('class', 'flex flex-row justify-center pt-[100px] gap-x-[12px]')
    
      actorCast.cast.slice(0, 5).forEach(movie => {
        // let castImgUrl = actor.profile_path
        // console.log("hola senior", castImgUrl)
        console.log(movie.title)
        const movieCastDiv = document.createElement("div");
        movieCastDiv.setAttribute("class", "pl-[100px] cursor-pointer")
        movieCastDiv.innerHTML = `
       <img class="rounded-[30%] h-[125px] w-[12 5px]" src="${BACKDROP_BASE_URL + movie.backdrop_path}" > 
        <p>${movie.title} </p> `
    
       
        moviesActedInList.appendChild(movieCastDiv);
    
        movieCastDiv.addEventListener("click",()=>{
        movieDetails(movie);      
          
        })
    
      })
};
document.addEventListener("DOMContentLoaded", autorun);