
const BASE_URL = "https://api.themoviedb.org/3";

let params = {};
let app = document.getElementById("append");

const fetchActor = (actorId) => {
    let url = new URL(BASE_URL+"/person/"+actorId);
    url.searchParams.append("api_key",TMDB_API_KEY);

    return fetch(url.href).then(res=>res.json())
};

const fetchMovie = (movieId) => {
    let url = new URL(BASE_URL+"/movie/"+movieId);
    url.searchParams.append("api_key",TMDB_API_KEY);

    return fetch(url.href).then(res=>res.json())
};

const addActor = (actor)=>{
    app.innerHTML += `
    <section class="actor" data-id="${actor.id}">
        <h2>${actor.name}</h2>
        <p>was in ...</p>
    </section>`;
    getMoviesForActor(actor.id).then(movies => {
        app.innerHTML += buildSelectMovie(movies);
    });
};

const addMovie = (movie) =>{
    app.innerHTML += `
    <section class="movie" data-id="${movie.id}">
        <h2>${movie.title}</h2>
        <p>with ...</p>
    </section>`;
    getActorsForMovie(movie.id).then(actors => {
        console.log(actors);
        app.innerHTML += buildSelectActor(actors);
    });
};


const getMoviesForActor = (actorId) => {
    let url = new URL(BASE_URL+"/person/"+actorId+"/movie_credits");
    url.searchParams.append("api_key",TMDB_API_KEY);
    return fetch(url.href).then(res=>res.json())
        .then(credits=>{
            console.log(actorId);
            console.log(credits);
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
    return html;
}

const buildSelectActor = (actors) => {
    let html = actors.reduce((selectHtml, actor) => {
        return selectHtml + `<option value="${actor.id}">${actor.name}</option>`
    }, '<select class="actor-list">') + '</select>';
    return html;
}


const getNextActor = () => {
    toggleButton();
    let node = app.querySelector("select");
    let nextActorId = node.value;
    node.parentNode.removeChild(node);
    fetchActor(nextActorId).then(addActor);
}
const getNextMovie = () => {
    toggleButton();
    let node = app.querySelector("select");
    let nextMovieId = node.value;
    node.parentNode.removeChild(node);
    fetchMovie(nextMovieId).then(addMovie);
}

function toggleButton() {
    let actorButton = document.getElementById("getActorBtn");
    let movieButton = document.getElementById("getMovieBtn");
    actorButton.classList.toggle("hidden");
    movieButton.classList.toggle("hidden");
}

document.getElementById("getActorBtn").addEventListener("click", getNextActor);
document.getElementById("getMovieBtn").addEventListener("click", getNextMovie);

