import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const url = "https://api.themoviedb.org/3/trending/movie/week";

      const options = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzIwODAzYzdkYTg4OGQ3NDA2NjViYWMyNjhiODQ3YSIsIm5iZiI6MTcyNDI3MzE4OS4wOTgwMTEsInN1YiI6IjY2YzY0ZmEyNzAxMGQxYzNlYjM5MzQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZM5a1DrBgnu2uAQRp5X4zeBOPLtZzrrNOzsYvN8h7JE",
        },
      };

      try {
        const response = await axios.get(url, options);
        setMovies(response.data.results);
      } catch (error) {
        setError("try later");
      }
    };
    fetchMovies();
  }, []);
  return (
    <div>
      <h1>Trending Movies</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <Link to={`/movies/${movie.id}`} key={movie.id}>
              {movie.title}
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
