function displayBooks(response) {
  let bookDetails = document.querySelector("#book-details");
  bookDetails.innerHTML = ""; 

  let titles = response[1];  
  let descriptions = response[2];  
  let links = response[3];  

  if (titles.length === 0) {
    bookDetails.innerHTML = "<p>No books found. Please try another search.</p>";
    return;
  }

  titles.forEach(function(title, index) {
    let description = descriptions[index] || "No description available.";
    let link = links[index];

    let bookItem = `
      <div class="book-item">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${link}" target="_blank">Read more on Wikipedia</a>
      </div>
    `;

    bookDetails.innerHTML += bookItem;
  });
}

function searchBooksByTitle(bookTitle) {
  let apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${encodeURIComponent(bookTitle)}&origin=*`;

  axios.get(apiUrl)
    .then(function(response) {
      displayBooks(response.data); 
    })
    .catch(function(error) {
      console.error("Error fetching data from Wikipedia API:", error);
      document.querySelector("#book-details").innerHTML = "<p>Something went wrong. Please try again later.</p>";
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  let bookTitle = searchInput.value.trim();

  if (bookTitle) {
    searchBooksByTitle(bookTitle); 
  } else {
    alert("Please enter a book title."); 
  }
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);
