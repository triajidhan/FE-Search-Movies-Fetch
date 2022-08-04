const searchButton = document.querySelector('#search-button'),
    searchInput = document.querySelector('#search-input'),
    movieList = document.querySelector('#movie-list'),
    seeDetails = document.querySelectorAll('.see-details'),
    modalBody = document.querySelector('.modal-body')

function showMovies() {
    movieList.innerHTML = ('')

    fetch('http://www.omdbapi.com/?apikey=3afb022f&s=' + searchInput.value)
        .then(response => response.json())
        .then(response => {
            const movies = response.Search
            let cards = ''
            movies.forEach(m => cards += showCards(m));
            movieList.innerHTML = cards

            searchInput.value = ('')
        })
}

searchButton.addEventListener('click', function () {
    showMovies()
})

searchInput.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        showMovies()
    }
})

movieList.addEventListener('click', function (e) {
    if (e.target.className == 'card-link see-details') {

        fetch('http://omdbapi.com/?apikey=3afb022f&i=' + e.target.dataset.id)
            .then(response => response.json())
            .then(m => {
                const movieDetail = showMovieDetail(m)

                modalBody.innerHTML = movieDetail
            })
    }
})

function showCards(m) {
    return `<div class=" col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="card-link see-details" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${m.imdbID}">See Details</a>
                    </div>
                </div>
            </div>`

}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-5 col-sm-12">
                        <img src="${m.Poster}" >
                    </div>
                
                    <div class="col-md-7 col-sm-12">
                        <ul class="list-group">
                            <li class="list-group-item"><h3>${m.Title}</h3></li>
                            <li class="list-group-item">Released: ${m.Released}</li>
                            <li class="list-group-item">Actors: ${m.Actors}</li>
                            <li class="list-group-item">Plot: ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
}