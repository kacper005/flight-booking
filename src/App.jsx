import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./custom_components/pages/Login";
import { Home } from "./custom_components/pages/Home";
import { AboutUs } from "./custom_components/pages/AboutUs"; // Import About Us page
import { Header } from "./custom_components/organisms/Header/Header";
import { ContentWrapper } from "./custom_components/layout/ContentWrapper";
import { Footer } from "./custom_components/organisms/Footer.jsx";

export const App = () => {
    return (
        <Router>
            <Header />
            <ContentWrapper>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} /> {/* New Route */}
                </Routes>
            </ContentWrapper>
            <Footer />
        </Router>
    );
};
