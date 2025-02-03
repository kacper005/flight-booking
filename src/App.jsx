import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Login } from "./custom_components/pages/Login";
import { Home } from "./custom_components/pages/Home";

export const App = () => {
  return (
    <Router>
      <nav style={{ display: "flex", justifyContent: "flex-start", marginBottom: "1rem", backgroundColor:"#3D52A0", height:"50px", width:"100%", textAlign:"center", color:"white"}}>
        <Link style={{ color: "white", textDecoration: "none", padding: "0 10px" }} to="/">Home</Link> | <Link style={{ color: "white", textDecoration: "none", padding: "0 10px" }} to="/login">Login</Link> 
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

