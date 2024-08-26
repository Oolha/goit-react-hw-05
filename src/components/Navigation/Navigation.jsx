import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink
        to="/"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        Home
      </NavLink>
      <NavLink
        to="/movies"
        className={({ isActive }) => clsx(css.link, isActive && css.active)}
      >
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
