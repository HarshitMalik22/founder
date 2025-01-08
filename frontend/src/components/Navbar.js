import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-around", padding: "10px", backgroundColor: "#1a1a1a", color: "white" }}>
      <Link to="/browse-ideas" style={{ textDecoration: "none", color: "white" }}>Browse Ideas</Link>
      <Link to="/my-applications" style={{ textDecoration: "none", color: "white" }}>My Applications</Link>
      <Link to="/profile" style={{ textDecoration: "none", color: "white" }}>Profile</Link>
    </nav>
  );
}

export default Navbar;
