import React from "react";
import { RouteLink } from "../RouteLink";
import logo from "@assets/logo.svg";
import small_logo from "@assets/small_logo.svg";
import "./Logo.css";

export const Logo = () => {
  return (
    <RouteLink to="/" margin={"0 1.6rem"}>
      <img className="logo large-logo" src={logo} alt="Flight Finder" />
      <img className="logo small-logo" src={small_logo} alt="Flight Finder" />
    </RouteLink>
  );
};
