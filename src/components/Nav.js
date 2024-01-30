import "../stylesheets/nav.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const activeStyle = { color: "#333", backgroundColor: "#ccc" };
  return (
    <nav>
      <NavLink
        end
        style={({ isActive }) => (isActive ? activeStyle : null)}
        to="/mood-pad"
      >
        Home
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : null)}
        to="/mood-pad/mood"
      >
        Mood
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeStyle : null)}
        to="/mood-pad/add-mood"
      >
        Add Mood
      </NavLink>
    </nav>
  );
};

export default Nav;
