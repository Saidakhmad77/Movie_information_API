document.getElementById('searchBtn').addEventListener('click', function () {
    const movieTitle = document.getElementById('movieTitle').value;
    
    if (movieTitle) {
      const apiKey = 'API_key'; 
      const url = `http://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;
      
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.Response === 'True') {
            const movieInfo = `
              <div>
                <img src="${data.Poster}" alt="${data.Title}" width="150" />
                <h2>${data.Title} (${data.Year})</h2>
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Director:</strong> ${data.Director}</p>
                <p><strong>Actors:</strong> ${data.Actors}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
              </div>
            `;
            document.getElementById('movieInfo').innerHTML = movieInfo;
          } else {
            document.getElementById('movieInfo').innerHTML = `<p>Movie not found. Please try again.</p>`;
          }
        })
        .catch(error => console.error('Error:', error));
    } else {
      document.getElementById('movieInfo').innerHTML = '<p>Please enter a movie title.</p>';
    }
  });
  