document.getElementById("firstActorBtn").addEventListener("click", start);

const getActorByName = (actorName) => {
    let url = new URL(BASE_URL+"/search/person");
    url.searchParams.append("query",actorName);
    url.searchParams.append("api_key",TMDB_API_KEY);

    return fetch(url.href).then(res=>res.json())
        .then(data=>{
            return data.results[0];
        });
};

function start() {
    document.getElementById("getMovieBtn").classList.toggle("hidden");
    document.getElementById("firstActorBtn").classList.toggle("hidden");

    let actorName = document.getElementById("movieActor").value;
    console.log(actorName)

    getActorByName(actorName).then(actor=>{
        console.log(actor);
        addActor(actor);
    });
}
