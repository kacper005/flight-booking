import React from "react";
import { RouteLink } from "../atoms/RouteLink";
import { Logo } from "../atoms/Logo";

export const Header = () => {
  return (
    <nav
      style={{
        backgroundColor: "#3D52A0",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Logo />
        <RouteLink to="/" style={{ marginLeft: "20px" }}>Home</RouteLink>
      </div>
      <div>
        <RouteLink to="#">Saved Trips</RouteLink>	
        <RouteLink to="/login">Login</RouteLink>
      </div>
    </nav>
  );
};