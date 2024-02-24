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

    container.innerHTML = `
    <h3>Download Servers</h3>

                <a href="${generateDownloadLink(movieDetails)}"><button class="button-4"><i class="fa fa-download" aria-hidden="true"></i>Download Link 1</button></a>
                <a href="${generateDownloadLink2(movieDetails)}"><button class="button-1"><i class="fa fa-download" aria-hidden="true"></i>Download Link 2</button></a>
                <a href="${generateDownloadLink3(movieDetails)}"><button class="button-3"><i class="fa fa-download" aria-hidden="true"></i>Download Link 3</button></a>
                <a href="${generateDownloadLink4(movieDetails)}"><button class="button-2"><i class="fa fa-download" aria-hidden="true"></i>Download Link 4</button></a>    
            </div>
        `;
}

function generateDownloadLink(movieDetails) {
    const formattedTitle = movieDetails.Title.replace(/ /g, '-').replace(/:/g, '');
    return `https://vegamovies.ngo/download-${formattedTitle.toLowerCase()}`;
}

function generateDownloadLink2(movieDetails) {
    const formattedTitle = movieDetails.Title.replace(/ /g, '-').replace(/:/g, '');
    return `https://themoviezflix.us.org/download-${formattedTitle.toLowerCase()}-`;
}

function generateDownloadLink3(movieDetails) {
    const formattedTitle = movieDetails.Title.replace(/ /g, '-').replace(/:/g, '');
    return `https://katmoviehd.zip/${formattedTitle.toLowerCase()}-`;
}

function generateDownloadLink4(movieDetails) {
    const formattedTitle = movieDetails.Title.replace(/ /g, '-').replace(/:/g, '');
    return `https://downloadhub.lat/${formattedTitle.toLowerCase()}}`;
}

// Call the movieDetails function with the retrieved IMDb ID
movieDetails(imdbID);