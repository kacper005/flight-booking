import React from "react";
import { RouteLink } from "../../atoms/RouteLink";
import { Logo } from "../../atoms/Logo";
import "./Header.css";

export const Header = () => {
  const navRef = React.useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <Logo />
      <nav ref={navRef}>
        <RouteLink to="/saved-trips">Saved Trips</RouteLink>
        <RouteLink to="/login">Login</RouteLink>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <ion-icon name="close-outline"></ion-icon>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <ion-icon name="menu-outline"></ion-icon>
      </button>
    </header>
  );
};
