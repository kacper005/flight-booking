import React from "react";
import { RouteLink } from "@atoms/RouteLink";
import { Logo } from "@atoms/Logo/Logo";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
import "./Header.css";

export const Header = () => {
  const loggedIn = false; // Replace with actual authentication logic
  const navRef = React.useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <Logo />
      <nav ref={navRef}>
        {loggedIn && <RouteLink to="/saved-trips">Saved Trips</RouteLink>}
        <RouteLink to="/sign-in">Sign In</RouteLink>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <X />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <Menu />
      </button>
    </header>
  );
};
