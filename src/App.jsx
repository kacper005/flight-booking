import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./custom_components/pages/Login";
import { Home } from "./custom_components/pages/Home";
import { Header } from "./custom_components/organisms/Header";
import { ContentWrapper } from "./custom_components/layout/ContentWrapper";


export const App = () => {
  return (
    <Router>
      <Header/>
      <ContentWrapper>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
     </ContentWrapper>
    </Router>
  );
};

