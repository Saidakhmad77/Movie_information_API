from flask import Flask, render_template, request
import requests

app = Flask(__name__)


OMDB_API_KEY = 'API_key'

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/search', methods=['POST'])
def search():
    movie_title = request.form.get('movieTitle')

    if movie_title:
        # Construct the API URL
        url = f"http://www.omdbapi.com/?t={movie_title}&apikey={OMDB_API_KEY}"
        
        # Make the API request
        response = requests.get(url)
        data = response.json()

        # Check if the movie was found
        if data.get('Response') == 'True':
            movie_info = {
                'title': data.get('Title'),
                'year': data.get('Year'),
                'genre': data.get('Genre'),
                'director': data.get('Director'),
                'actors': data.get('Actors'),
                'plot': data.get('Plot'),
                'rating': data.get('imdbRating'),
                'poster': data.get('Poster')
            }
            return render_template('./index.html', movie=movie_info)
        else:
            return render_template('./index.html', error="Movie not found. Please try again.")
    
    return render_template('./index.html', error="Please enter a movie title.")

if __name__ == '__main__':
    app.run(debug=True)
