import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { CircleUserRound } from "lucide-react";
import { useAuth } from "@hooks/useAuth";
import "./Navbar.css";

export const Navbar = ({ isOpen, setIsOpen }) => {
  const { isLoggedIn, user, logout } = useAuth();

  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  return (
    <div className={`sidenav ${isOpen ? "open" : ""}`}>
      <div className="sidenav-header">
        <X
          style={{
            margin: "none",
            cursor: "pointer",
            color: "var(--textColor)",
          }}
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div className="user-info">
        <CircleUserRound style={{ color: "var(--textColor)" }} />
        <p style={{ color: "var(--textColor)" }}>
          Welcome, {user?.firstName || "Guest"}
        </p>
      </div>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        {!isLoggedIn && (
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Sign In
            </NavLink>
          </li>
        )}
        {isLoggedIn && (
          <>
            <li>
              <NavLink
                to="/saved-trips"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Saved Trips
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Profile
              </NavLink>
            </li>
            {user?.role === "ADMIN" && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Admin
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/sign-in" onClick={logout}>
                Log Out
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
