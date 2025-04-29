import React from "react";
import { RouteLink } from "@atoms/RouteLink";
import { Logo } from "@atoms/Logo/Logo";
import { CircleUser, Menu, X } from "lucide-react";
import { useAuth } from "@context/AuthContext";
import { Button } from "@atoms/Button";
import "./Header.css";

export const Header = () => {
  const navRef = React.useRef();

  const { isLoggedIn, user, logout } = useAuth();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  //TODO: Rerender the header when the user logs in or out
  return (
    <header>
      <Logo />
      <nav ref={navRef}>
        {isLoggedIn && (
          <>
            <RouteLink to="/saved-trips">Saved Trips</RouteLink>
            <div style={{ gap: "1rem", display: "flex", alignItems: "center" }}>
              <CircleUser />
              <RouteLink margin="0" to="/profile">
                {user?.firstName || "User"}
              </RouteLink>
              <Button onClick={logout}>Logout</Button>
            </div>
          </>
        )}
        {!isLoggedIn && <RouteLink to="/sign-in">Sign In</RouteLink>}
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
