import React from "react";
import { Menu } from "lucide-react";
import { Logo } from "@atoms/Logo/Logo";
import "./Header.css";

export const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <Logo />
      <button
        className="nav-btn"
        aria-label={"Open navigation menu"}
        onClick={toggleSidebar}
      >
        <Menu />
      </button>
    </header>
  );
};
