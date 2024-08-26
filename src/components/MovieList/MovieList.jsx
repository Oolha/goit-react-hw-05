import { Link } from "react-router-dom";

const MovieList = ({ movies, showImage = false }) => {
  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              {showImage && movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <p>{movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
