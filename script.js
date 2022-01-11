let page = 1;
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cad293453ae8fafb1b5a3452cd80e2d7&page=';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=cad293453ae8fafb1b5a3452cd80e2d7&query="';
let CURR_URL = API_URL;

const main = document.getElementById("main");
const form = document.getElementById('form');
const search = document.getElementById('search');


getMovies(API_URL+page);                                                //Home Page

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
    console.log(data.results);
    
}

function showMovies(movies){
    main.innerHTML = ' ';

    movies.forEach((movie) =>{
        const {title, poster_path, vote_average,overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = ` 
        
        <img src="${IMG_PATH + poster_path}" >
    <div id="movie-info">
        <h3>${title}</h3>
        <span class="${(getColorByRate(vote_average))}" id = "rating">${(vote_average)}</span>
    </div>
    <div class="overview">
        <h3>Overview</h3>
        ${(overview)}

    </div> `
    main.appendChild(movieEl);
    })
}


function getColorByRate(vote){
if(vote >= 8)
return 'green';
else if (vote>=5 && vote <8)
return 'orange';
else
return 'red';
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const searchTerm  = search.value;
    
    if(searchTerm && searchTerm !== ' ')//to check if the given term exists
    {
        getMovies(SEARCH_API + searchTerm);
        CURR_URL = SEARCH_API + searchTerm +"&page=";
        searchTerm.value = ' ';
        
    }else{
        window.location.reload();
    }
})

let sort_by_vote_count =  document.getElementById('sort_by_vote_count');
let sort_by_vote = document.getElementById('sort_by_vote');
let sort_by_popularity = document.getElementById('sort_by_popularity');

const new_url = "https://api.themoviedb.org/3/discover/movie?api_key=cad293453ae8fafb1b5a3452cd80e2d7";

sort_by_vote.addEventListener('click', (e)=>{
    page = 1;
    getMovies(new_url + "&sort_by=vote_average.desc&page=")
    CURR_URL = new_url+"&sort_by=vote_average.desc&page=";
})

sort_by_popularity.addEventListener('click', (e)=>{
    page = 1;
    getMovies(new_url + "&sort_by=popularity.desc&page=")
    CURR_URL = new_url+ "&sort_by=popularity.desc&page=";
})

sort_by_vote_count.addEventListener('click', (e)=>{
    page = 1;
    getMovies(new_url + "&sort_by=vote_count.desc&page=")
    CURR_URL = new_url+"&sort_by=vote_count.desc&page=";
})

const title = document.getElementById('title');
page = 1;
title.addEventListener('click', (e) =>{
    getMovies(API_URL);
})


const next_page = document.getElementById("next");
next_page.addEventListener("click",(e)=>{
    e.preventDefault();
    page++;
    getMovies(CURR_URL+page);
    console.log(page);
})
