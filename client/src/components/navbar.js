import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Recipes</Link>
        </li>
        <li>
          <Link to="/">Add Recipe</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
