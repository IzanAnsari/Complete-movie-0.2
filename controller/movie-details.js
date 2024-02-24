// Retrieve imdbID from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('id');

// Call function to fetch and display movie details
async function movieDetails(imdbID) {
    try {
        let res = await fetch(`https://omdbapi.com/?apikey=374a7ebf&i=${imdbID}&plot=full`);
        let movieDetails = await res.json();
        console.log(movieDetails);

        // Display movie details in the container
        showMovieDetails(movieDetails);
    } catch (err) {
        console.error(err);
    }
}

function showMovieDetails(movieDetails) {
    let container = document.getElementById('movie-details-container');

    // Convert IMDb rating to stars
    const ratingStars = getRatingStars(movieDetails.imdbRating);

    container.innerHTML = `
        <div class="image-column">
            <img src="${movieDetails.Poster}" alt="${movieDetails.Title} Poster">
        </div>
        <div class="text-column">
            <h2>${movieDetails.Title}</h2>
            <p><span class="span">Movie Details: </span>${movieDetails.Plot}</p>
            <p><span class="span">Actors: </span>${movieDetails.Actors}</p>
            <p><span class="span">Released: </span>${movieDetails.Released}</p>
            <p><span class="span">Runtime: </span>${movieDetails.Runtime}</p>
            <h4><span class="span">Rating: </span><span class="rating-stars">${ratingStars}</span></h4>
            <p><span class="span">Genre: </span>${movieDetails.Genre}</p>
            <p><span class="span">Boxoffice Collection: </span> <span class="blue">${movieDetails.BoxOffice}</span></p>
            <p><span class="span">Achivements: </span>${movieDetails.Awards}</p>
            <p><span class="span">Director: </span>${movieDetails.Director}</p>
            <a href="https://www.imdb.com/title/${movieDetails.imdbID}">
                <button id="trailerBtn"><i class="fa fa-video-camera" aria-hidden="true"></i> Trailer</button>
            </a>

            <a href="#" id="downloadBtn"><button><i class="fa fa-download" aria-hidden="true"></i> Download</button></a>
        </div>
    `;

    // Add event listener for the download button after the content is loaded
    document.getElementById('downloadBtn').addEventListener('click', function () {
        // Check if the language is Hindi, then redirect to the Bollywood download page
        if (movieDetails.Language.toLowerCase() === 'hindi' && 'rajasthani') {
            window.location.href = `./bollywoodDownload.html?id=${imdbID}`;
        } else {
            // For other languages, redirect to the Hollywood download page
            window.location.href = `./hollywoodDownload.html?id=${imdbID}`;
        }
    });
}

function getRatingStars(rating) {
    const roundedRating = Math.round(rating / 2); // IMDb ratings are out of 10, so divide by 2
    return '★'.repeat(roundedRating) + '☆'.repeat(5 - roundedRating);
}

// Call the movieDetails function with the retrieved IMDb ID
movieDetails(imdbID);
