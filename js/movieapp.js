// var url = new URL("https://geo.example.org/api")
// params = {lat:35.696233, long:139.570431}
// Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

const BASE_URL = "https://api.themoviedb.org/3";
let params = {};

let app = document.getElementById("app");

let kevinBaconId = 4724;

const getActor = () => {
    let actorId = document.getElementById("movieActor").value;
    // if (!parseInt(actorId))
    //     return getActorByName(actorId);
    let url = new URL(BASE_URL+"/person/"+actorId);
    url.searchParams.append("api_key",TMDB_API_KEY);

    fetch(url.href).then(res=>res.json())
        .then(actor=>{
            console.log(actor);
            addActor(actor)
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
            addActor(actor)
        });
}

const addActor = (actor)=>{
    // let newActor = document.createElement("section");
    // newActor.className = "actor";
    app.innerHTML += `
    <section class="actor" data-id="${actor.id}">
        <h3>${actor.name}</h3>
    </section>`;
}
const addMovie = (movie) =>{
    app.innerHTML += `
    <section class="movie" data-id="${movie.id}">
        <h3>${movie.title}</h3>
    </section>`;
}

const getMoviesForActor = (actorId) => {
    let url = new URL(BASE_URL+"/person/"+actorId+"/movie_credits");
    url.searchParams.append("api_key",TMDB_API_KEY);

    fetch(url.href).then(res=>res.json())
        .then(credits=>{
            console.log(credits.cast);
            return credits.cast;
        });
}

const getActorsForMovie = (movieId) => {
    let url = new URL(BASE_URL+"/movie/"+movieId+"/credits");
    url.searchParams.append("api_key",TMDB_API_KEY);

    fetch(url.href).then(res=>res.json()).then(cast=>{
        console.log(cast.cast);
        return cast.cast;
    });
}

document.getElementById("getActor").addEventListener("click", getActor);
document.getElementById("getMovie").addEventListener("click", getMovie);
