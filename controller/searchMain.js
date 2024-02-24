
document.getElementById('search-bar').addEventListener('submit', function (event) {
    event.preventDefault();
    searchMovies();
});

async function searchMovies() {
    try {
        const searchInput = document.getElementById('movie').value || 'Pirates of the Caribbean';
        let res = await fetch(`https://omdbapi.com/?apikey=374a7ebf&s=${searchInput}&page=${currentPage}`);
        let myRes = await res.json();
        result(myRes.totalResults);
        showData(myRes.Search);
        console.log(myRes.Search);
        updatePagination(myRes.totalResults);
        scrollToTop(); // Scroll to top when new results are loaded
    } catch (err) {
        console.log(err);
    }
}


function showData(arr) {
    let container = document.getElementById('container');
    container.innerHTML = '';

    arr.forEach(function (elem) {
        let movieBox = document.createElement('div');
        movieBox.classList.add('movie-box');

        movieBox.innerHTML = `
            <div class="imgContainer">
                <img src="${elem.Poster}" alt="${elem.Title} Poster">
            </div>
            <h3>${elem.Title}</h3>
            <h3>${elem.Year}</h3>
        `;

        movieBox.addEventListener('click', function () {
            window.location.href = `../views/movie-details.html?id=${elem.imdbID}`;
        });

        container.appendChild(movieBox);
    });
}

let currentPage = 1;
let totalPages = 1;

document.getElementById('search-bar').addEventListener('submit', function (event) {
    event.preventDefault();
    currentPage = 1;
    searchMovies();
});

document.getElementById('prevButton').addEventListener('click', function () {
    changePage(-1);
});

document.getElementById('nextButton').addEventListener('click', function () {
    changePage(1);
    scrollToTop();
});


function changePage(offset) {
    currentPage += offset;
    searchMovies();
}

function updatePagination(totalResults) {
    // Calculate total pages based on totalResults (assuming 10 results per page)
    totalPages = Math.max(1, Math.ceil(totalResults / 10));
    document.getElementById('totalPages').innerText = totalPages;
    document.getElementById('currentPage').innerText = currentPage;
    document.getElementById('prevButton').disabled = currentPage === 1;
    document.getElementById('nextButton').disabled = currentPage >= totalPages;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional: Add smooth scrolling effect
    });
}

function result(totalResults) {
    let resultElement = document.querySelector('#result');
    resultElement.innerHTML = `<h4>About <span>${totalResults}</span> results in just 0.33 seconds</h4>`;
}



// Initial call to get default movies and suggestions
// Get the reference to the input element
var movieInput = document.getElementById("movie");

// Add an event listener to the input for the "input" event
movieInput.addEventListener("input", debounce);

// Function to search for movies based on input
async function searchMovie() {
    // Get the input value
    var movie = document.getElementById("movie").value;

    // Check if the input length is less than 3 characters
    if (movie.length < 3) {
        return;
    }

    // Fetch movie suggestions from the OMDB API
    var search = await fetch(`https://www.omdbapi.com/?&apikey=83de0602&s=${movie}`);
    var movieL = await search.json();

    // Check if there are suggestions
    if (movieL.Search != undefined) {
        // Display suggestions
        suggestionInput(movieL.Search);
    } else {
        // Handle error (you can uncomment the alert if needed)
        // alert("Error"+movieL.Error);
    }

    // Display movies (showMovie function not defined in provided code)
    // showMovie(movieL.Search);
}

// Function to display suggestions in the input box
function suggestionInput(arr) {
    // Get the container for suggestions
    var contain = document.getElementById("inputBox");
    // Clear the container
    contain.innerHTML = '';
    
    // Create suggestion cards for each movie
    arr.map((ele) => {
        var card = document.createElement("div");
        card.innerHTML = `<p>${ele.Title}</p>`;
        card.className = "suggestion";
        card.id = ele.imdbID;

        // Add click event listener to each suggestion card
        card.addEventListener('click', () => {
            // Set the value of the input field to the clicked suggestion
            document.getElementById("movie").value = ele.Title;
            // Hide the suggestions
            contain.className = 'nonvisible';
        });

        // Append suggestion card to the container
        contain.append(card);
    });
}

// Variable for debounce mechanism
var debounceId;

// Function for debounce mechanism
function debounce() {
    // Clear previous timeout if it exists
    if (debounceId) {
        clearInterval(debounceId);
    }
    // Set a new timeout for searching after 1000 milliseconds (1 second)
    debounceId = setTimeout(searchMovie, 1000);
}

// Add event listener for the "focusin" event on the input
document.getElementById("movie").addEventListener('focusin', () => {
    // Get the suggestion box
    var box = document.getElementById('inputBox');
    // Set the class to 'visible'
    box.className = 'visible';
});

// Add event listener for the "focusout" event on the input
document.getElementById("movie").addEventListener('focusout', () => {
    // Get the suggestion box
    var box = document.getElementById('inputBox');
    // Set the class to 'nonvisible'
    box.className = 'nonvisible';
});
searchMovies();

