import React from "react";
import { Logo } from "@atoms/Logo/Logo";
import { Menu } from "lucide-react";
import "./Header.css";

export const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      <Logo />
      <button className="nav-btn" onClick={toggleSidebar}>
        <Menu />
      </button>
    </header>
  );
};
