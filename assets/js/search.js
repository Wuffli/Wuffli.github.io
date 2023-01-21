// First, parse the JSON we've thrown into the DOM
let searchData = JSON.parse(document.getElementById('search-data').textContent);

// Create a reference to our search results
let searchResultsList = document.getElementById('search-results');

// And one for our search input
let searchInput = document.getElementById('search-bar');

// Add the search button.
let searchButton = document.getElementById('search-button');

let searchURL = new URL('/search', document.location);

let searchURLQuerry = new URLSearchParams(document.location.search);
let searchQuerry = searchURLQuerry.get('q')

searchInput.value = searchQuerry;
  

let updateSearchResults = function(e) {
  // Make the query case-insensitive
  searchQuerry = e.target.value.toLowerCase();

  // Make sure it isn't empty
  doSearch();
};

function doSearch() {
  if (searchQuerry !== null) {
    if (searchQuerry.trim() !== '') {

      // Empty the search results DOM element
      searchResultsList.innerHTML = "";

      searchURL.search = "q=" + searchQuerry;

      searchButton.setAttribute('href', searchURL);

      // Loop over all the items in our JSON blob
      for (let i in searchData) {
        let searchItem = searchData[i];

        // Check if the title or snippet includes our query string
        if (searchItem.title.toLowerCase().includes(searchQuerry) || searchItem.snippet.toLowerCase().includes(searchQuerry) || searchItem.tags.toLowerCase().includes(searchQuerry)) {

          // If it does, append a link to our results element
          let htmlSearchLink = document.createElement('a');
          let htmlSearchHeader = document.createElement('h4');
          let htmlSearchParagraph = document.createElement('p');
          let htmlSearchTitle = document.createTextNode(searchItem.title);
          let htmlSearchDescription = document.createTextNode(searchItem.snippet);

          htmlSearchLink.setAttribute('href', searchItem.href);

          htmlSearchLink.appendChild(htmlSearchHeader);
          htmlSearchHeader.appendChild(htmlSearchTitle);

          htmlSearchLink.appendChild(htmlSearchParagraph);
          htmlSearchParagraph.appendChild(htmlSearchDescription);

          searchResultsList.appendChild(htmlSearchLink);

          searchButton.setAttribute('href', searchURL);
        }
      }
    }
  }
  
}

function openURL(event) {
  if (event.code == 'Enter') {
    location.href = searchURL;
  }
}

// Finally, bind our new function to the search input element
searchInput.addEventListener('keyup', updateSearchResults);
searchInput.addEventListener('keyup', openURL);
doSearch();


