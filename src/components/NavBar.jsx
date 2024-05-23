import React from "react";
import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}
