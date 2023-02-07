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

let tagButtons = document.querySelectorAll('[id=tag]')
console.log(tagButtons);

let selectedTags = [];

selectedTags.push(searchURLQuerry.get('tag'));
tagButtons.forEach(element => {
  if (element.getAttribute('tag').trim() == searchURLQuerry.get('tag')) {
    element.className = 'clicked';
  }
});

let Tag = function(e) {
  let tagStatus = e.target.className;

  let name = e.target.getAttribute('tag').trim();
  
  if (tagStatus == 'clicked') {
    e.target.className = 'not-clicked'
    let index = selectedTags.indexOf(name) 
    console.log(index);
    if (index >= 0) {
      selectedTags.splice(index, 1)
    }
  }
  else if (tagStatus == 'not-clicked') {
    e.target.className = 'clicked'
    selectedTags.push(name)
  }

  DoSearch();
  console.log(selectedTags);
}



  

let updateSearchResults = function(e) {
  // Make the query case-insensitive
  searchQuerry = e.target.value.toLowerCase();

  // Make sure it isn't empty
  DoSearch();
};

function DoSearch() {
  // Empty the search results DOM element
  searchResultsList.innerHTML = "";
  if (searchQuerry !== null) {
    if (searchQuerry.trim() !== '') {

      

      searchURL.search = "q=" + searchQuerry;

      searchButton.setAttribute('href', searchURL);

      // Loop over all the items in our JSON blob
      for (let i in searchData) {
        let searchItem = searchData[i];

        let containsTag = true;

        selectedTags.forEach(selectedTag => {
          if (!searchItem.tags.includes(selectedTag)) {
            containsTag = false
          }
        });

        // Check if the title or snippet includes our query string
        if (containsTag && (searchItem.title.toLowerCase().includes(searchQuerry) || searchItem.snippet.toLowerCase().includes(searchQuerry) || searchItem.tags.toLowerCase().includes(searchQuerry))) {
          addResult(searchItem);
        }
      }
    }
    else{
      for (let i in searchData) {
        let searchItem = searchData[i];
  
        let containsTag = true;
  
        selectedTags.forEach(selectedTag => {
          if (!searchItem.tags.includes(selectedTag)) {
            containsTag = false
          }
        });
  
        if (containsTag) {
          addResult(searchItem);
        }
      }
    }
  }
  else{
    for (let i in searchData) {
      let searchItem = searchData[i];

      let containsTag = true;

      selectedTags.forEach(selectedTag => {
        if (!searchItem.tags.includes(selectedTag)) {
          containsTag = false
        }
      });

      if (containsTag) {
        addResult(searchItem);
      }
    }
  }
  
}

function addResult(searchItem) {
  // If it does, append a link to our results element
  let htmlSearchLink = document.createElement('a');
  let htmlSearchHeader = document.createElement('h3');
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

function openURL(event) {
  if (event.code == 'Enter') {
    location.href = searchURL;
  }
}


// Finally, bind our new function to the search input element
searchInput.addEventListener('keyup', updateSearchResults);
searchInput.addEventListener('keyup', openURL);

tagButtons.forEach(element => {
  element.addEventListener('click', Tag)
});
DoSearch();

console.log("test");


