import React from "react";

export const Header = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/login">Login</Link>
    </nav>
  );
}