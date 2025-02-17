import React from "react";
import logo from "../../assets/logo.svg";
import { RouteLink } from "./RouteLink";

export const Logo = () => {
  return (
    <RouteLink to="/">
      <img
        style={{ fontSize: "35px", lineHeight: "80px" }}
        src={logo}
        alt="Flight Finder"
      />
    </RouteLink>
  );
};
