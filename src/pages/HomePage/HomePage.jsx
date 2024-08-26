import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

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
    <div className={css.box}>
      <h3 className={css.title}>Trending Movies</h3>
      {error ? <p>{error}</p> : <MovieList movies={movies} showImage={false} />}
    </div>
  );
};

export default HomePage;
