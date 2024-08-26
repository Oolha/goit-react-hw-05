import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import css from "./MoviePage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, [searchQuery]);
  const searchMovies = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzIwODAzYzdkYTg4OGQ3NDA2NjViYWMyNjhiODQ3YSIsIm5iZiI6MTcyNDI3MzE4OS4wOTgwMTEsInN1YiI6IjY2YzY0ZmEyNzAxMGQxYzNlYjM5MzQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZM5a1DrBgnu2uAQRp5X4zeBOPLtZzrrNOzsYvN8h7JE",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      setError("An unexpected error occurred");
    }
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ query: searchQuery });
      searchMovies(searchQuery);
    }
  };

  return (
    <div>
      <h3>Search Movies</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter movie title"
          className={css.input}
        />
        <button type="submit" className={css.inputBtn}>
          Search
        </button>
      </form>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {!isLoading && !error && (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>
                {movie.title} ({movie.release_date?.split("-")[0]})
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!isLoading && !error && movies.length === 0 && searchQuery && (
        <div>No movies found for "{searchQuery}"</div>
      )}
    </div>
  );
};
export default MoviesPage;
