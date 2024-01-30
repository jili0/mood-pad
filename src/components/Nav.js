import "../stylesheets/nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
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
        to="/react-project/mood"
      >
        Mood
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : null)}
        to="/react-project/add-mood"
      >
        Add Mood
      </NavLink>
    </nav>
  );
};

export default Nav;
