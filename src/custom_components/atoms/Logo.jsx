import React from "react";
import logo from "../../assets/logo.svg";

export const Logo = () => {
  return (
    <div>
      <img style={{width:"250px"}} src={logo} alt="Flight Finder" />
    </div>
  );
}