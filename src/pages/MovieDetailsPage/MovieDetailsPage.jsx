import { useEffect, useState, useRef } from "react";
import { useLocation, useParams, Link, Outlet } from "react-router-dom";
import axios from "axios";
import css from "./MovieDetailsPage.module.css";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        const data = await requestSingleMovieData(movieId);

        setMovieDetails(data);
      } catch (error) {
        setError("Failed to load movie details. Please try again later.");
      }
    };
    fetchMoviesDetails();
  }, [movieId]);

  const backLinkRef = useRef(location.state?.from ?? "/movies");

  return (
    <div>
      <Link to={backLinkRef.current}>⬅ Go back</Link>
      {error && <p>{error}</p>}
      {movieDetails && !error && (
        <div>
          <div className={css.box}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
              className={css.img}
            />

            <div className={css.boxOverview}>
              <h3>
                {movieDetails.title}({movieDetails.release_date})
              </h3>
              <h4>Genres:</h4>
              <p>{movieDetails.genres.map((genre) => genre.name).join(", ")}</p>

              <h4>Overveiw:</h4>
              <p>{movieDetails.overview}</p>
            </div>
          </div>

          <div className={css.info}>
            <p>Additional information</p>
            <Link to="cast">Cast</Link>
            <Link to="reviews">Reviews</Link>
          </div>

          <Outlet />
        </div>
      )}
    </div>
  );
};

const requestSingleMovieData = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzIwODAzYzdkYTg4OGQ3NDA2NjViYWMyNjhiODQ3YSIsIm5iZiI6MTcyNDI3MzE4OS4wOTgwMTEsInN1YiI6IjY2YzY0ZmEyNzAxMGQxYzNlYjM5MzQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZM5a1DrBgnu2uAQRp5X4zeBOPLtZzrrNOzsYvN8h7JE",
      },
    }
  );
  return data;
};
export default MovieDetailsPage;
