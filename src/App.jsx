import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Login} from "./custom_components/pages/Login";
import {Home} from "./custom_components/pages/Home";
import {Header} from "./custom_components/organisms/Header";
import {ContentWrapper} from "./custom_components/layout/ContentWrapper";
import {Footer} from "./custom_components/organisms/Footer.jsx";


export const App = () => {
    return (
        <Router>
            <Header/>
            <ContentWrapper>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                </Routes>
            </ContentWrapper>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <div style={{ flex: 1 }}/>
                <Footer/>
            </div>
        </Router>
    );
};

