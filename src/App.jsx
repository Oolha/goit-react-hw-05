import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.css";

function App() {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">HomePage</Link>
          <Link to="/movies">MoviesPage</Link>
          <Link to="/movies/:movieId">MovieDetailsPage</Link>
          <Link to="/movies/:movieId/cast">MovieCast</Link>
          <Link to="/movies/:movieId/reviews">MovieReviews</Link>
          <Link to="/"></Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
          <Route
            path="/movies/:movieId/reviews"
            element={<MovieDetailsPage />}
          />
          <Route path="/movies/:movieId/cast" element={<MovieDetailsPage />} />
          <Route path="/" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
