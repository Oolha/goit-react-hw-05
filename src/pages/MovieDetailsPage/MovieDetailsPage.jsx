import { useEffect, useState, useRef } from "react";
import { useLocation, useParams, Link, Outlet } from "react-router-dom";
import axios from "axios";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        const data = await requestSingleMovieData(movieId);

        setMovieDetails(data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchMoviesDetails();
  }, [movieId]);

  const backLinkRef = useRef(location.state?.from ?? "/movies");

  return (
    <div>
      {movieDetails && (
        <div>
          <Link to={backLinkRef.current}>⬅ Go back</Link>;
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          <div>
            <p>Additional information</p>
            <Link to="cast">Cast</Link>
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
