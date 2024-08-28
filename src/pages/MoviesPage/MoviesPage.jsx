import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import css from "./MoviePage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || ""
  );
  const [noResults, setNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const searchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        setNoResults(false);
        setMovies([]);
        if (searchParams.get("query")) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${searchParams.get(
              "query"
            )}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzIwODAzYzdkYTg4OGQ3NDA2NjViYWMyNjhiODQ3YSIsIm5iZiI6MTcyNDI3MzE4OS4wOTgwMTEsInN1YiI6IjY2YzY0ZmEyNzAxMGQxYzNlYjM5MzQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZM5a1DrBgnu2uAQRp5X4zeBOPLtZzrrNOzsYvN8h7JE",
              },
            }
          );
          if (response.data.results.length === 0) {
            setNoResults(true);
          } else {
            setMovies(response.data.results);
          }
        }
      } catch (error) {
        setError("An unexpected error occurred");
      }
      setIsLoading(false);
    };
    searchMovies();
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ query: searchQuery.trim() });
    } else {
      setMovies([]);
      setSearchParams({});
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

      {noResults && <p>No movies found for "{searchParams.get("query")}"</p>}

      {!isLoading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
};
export default MoviesPage;
