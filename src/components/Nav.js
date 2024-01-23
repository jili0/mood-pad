import "../stylesheets/nav.css";
import { NavLink } from "react-router-dom";

const Nav = ({ search, setSearch }) => {
  const activeStyle = { color: "#333", backgroundColor: "#ccc" };
  return (
    <nav>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : null)}
        to="/react-project/home"
      >
        Home
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : null)}
        to="/react-project/post"
      >
        Mood
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : null)}
        to="/react-project/add-post"
      >
        Add Mood
      </NavLink>
    </nav>
  );
};

export default Nav;
