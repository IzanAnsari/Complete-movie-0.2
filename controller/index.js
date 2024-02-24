// An asynchronous function to fetch data from the specified URL and display it in the specified container.
async function fetchData(url, containerId) {
    try {
        // Fetch data from the provided URL.
        let res = await fetch(url);
        
        // Parse the response as JSON.
        let myRes = await res.json();
        
        // Call the showData function with the 'Search' property of the response and the containerId.
        showData(myRes.Search, containerId);
    } catch (err) {
        // Handle any errors that occur during the fetch or parsing process.
        console.error(err);
    }
}

// Function to display data in the specified container.
function showData(data, containerId) {
    // Get the container element using the provided containerId.
    let container = document.getElementById(containerId);

    // Iterate through each element in the data array.
    data.forEach(function (elem) {
        // Create a new div element with the class "movie-box".
        let movieBox = document.createElement('div');
        movieBox.classList.add("movie-box");

        // Set the inner HTML of the movieBox div with data from the current element.
        movieBox.innerHTML = `
            <div class="imgContainer">
                <img src="${elem.Poster}" alt="${elem.Title} Poster">
            </div>
            <h3>${elem.Title}</h3>
            <h3>${elem.Year}</h3>
        `;

        // Add a click event listener to navigate to a movie details page when the movieBox is clicked.
        movieBox.addEventListener('click', function () {
            window.location.href = `../views/movie-details.html?id=${elem.imdbID}`;
        });

        // Append the movieBox to the container.
        container.appendChild(movieBox);
    });
}

// Fetch data for different movies and display them in different containers.
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=avengers', 'container');
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=stranger things', 'container01');
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=housefull', 'container02');
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=john wick', 'container03');
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=Aashiqui', 'container04');
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=wrong turn', 'container05');
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=Bob the Builder', 'container06');
fetchData('https://omdbapi.com/?apikey=374a7ebf&s=Mission: Impossible', 'container07');

