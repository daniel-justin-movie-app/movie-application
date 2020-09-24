// var url = new URL("https://geo.example.org/api")
// params = {lat:35.696233, long:139.570431}
// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

const BASE_URL = "https://api.themoviedb.org/3";
let params = {};

let app = document.getElementById("append");

let kevinBaconId = 4724;

const getActor = () => {
    console.log('hello');
    let actorId = document.getElementById("movieActor").value;
    // if (!parseInt(actorId))
    //     return getActorByName(actorId);
    let url = new URL(BASE_URL+"/person/"+actorId);
    url.searchParams.append("api_key",TMDB_API_KEY);

    fetch(url.href)
        .then(res=>res.json())
        .then(actor=>{
            console.log(actor);
            addActor(actor);
        });
};

const getMovie = () => {
    let movieId = document.getElementById("movieActor").value;

    let url = new URL(BASE_URL+"/movie/"+movieId);
    url.searchParams.append("api_key",TMDB_API_KEY);

    fetch(url.href).then(res=>res.json()).then(movie=>{
        console.log(movie);
        addMovie(movie);
    })
}

const getActorByName = (actorName) => {
    let url = new URL(BASE_URL+"/search/person");
    url.searchParams.append("query",actorName);
    url.searchParams.append("api_key",TMDB_API_KEY);

    fetch(url.href).then(res=>res.json())
        .then(actor=>{
            console.log(actor);
            addActor(actor);
        });
}

const addActor = (actor)=>{
    // let newActor = document.createElement("section");
    // newActor.className = "actor";
    app.innerHTML += `
    <section class="actor" data-id="${actor.id}">
        <h3>${actor.name}</h3>
    </section>`;
    getMoviesForActor(actor.id).then(movies => {
        app.innerHTML += buildSelectMovie(movies);
        document.getElementById('confirm').addEventListener('click', () => {
            const movieId = document.querySelector('.movie-list').value;
            console.log(movieId);
        });
    });
}
const addMovie = (movie) =>{
    app.innerHTML += `
    <section class="movie" data-id="${movie.id}">
        <h3>${movie.title}</h3>
    </section>`;
    getActorsForMovie(movie.id).then(console.log);
}


const getMoviesForActor = (actorId) => {
    let url = new URL(BASE_URL+"/person/"+actorId+"/movie_credits");
    url.searchParams.append("api_key",TMDB_API_KEY);
    return fetch(url.href).then(res=>res.json())
        .then(credits=>{
            const films = credits.cast.map(({id, title}) => ({id, title}));
            return films;
        });
}

const getActorsForMovie = (movieId) => {
    let url = new URL(BASE_URL+"/movie/"+movieId+"/credits");
    url.searchParams.append("api_key",TMDB_API_KEY);

    return fetch(url.href).then(res=>res.json()).then(cast=>{
        const actors = cast.cast.map(({id, name}) => ({id, name}));
        return actors;
    });
}

const buildSelectMovie = (movies) => {
    let html = movies.reduce((selectHtml, movie) => {
        return selectHtml + `<option value="${movie.id}">${movie.title}</option>`
    }, '<select class="movie-list">') + '</select>';
    html += `<button id="confirm">Confirm Movie</button>`;
    return html;
}

document.getElementById("getActor").addEventListener("click", getActor);
document.getElementById("getMovie").addEventListener("click", getMovie);
