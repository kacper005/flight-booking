import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./custom_components/pages/Login";
import { Home } from "./custom_components/pages/Home";
import { AboutUs } from "./custom_components/pages/AboutUs";
import { Header } from "./custom_components/organisms/Header/Header";
import { ContentWrapper } from "./custom_components/layout/ContentWrapper";
import { Footer } from "./custom_components/organisms/Footer.jsx";

import { ImportantInformation } from "./custom_components/pages/ImportantInformation";
import { FAQ } from "./custom_components/pages/FAQ";
import { SignUp } from "./custom_components/pages/SignUp/SignUp";

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/important-information"
              element={<ImportantInformation />}
            />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </ContentWrapper>
        <Footer />
      </div>
    </Router>
  );
};
