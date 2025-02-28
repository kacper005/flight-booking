import React from "react";
import { RouteLink } from "../../atoms/RouteLink";
import { Logo } from "@/custom_components/atoms/Logo/Logo";
import { Menu } from "lucide-react";
import { X } from "lucide-react";
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
          <X />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <Menu />
      </button>
    </header>
  );
};
