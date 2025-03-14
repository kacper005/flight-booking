import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./custom_components/pages/SignIn";
import { Home } from "./custom_components/pages/Home";
import { AboutUs } from "./custom_components/pages/AboutUs";
import { Header } from "./custom_components/organisms/Header/Header";
import { ContentWrapper } from "./custom_components/layout/ContentWrapper";
import { Footer } from "./custom_components/organisms/Footer.jsx";

import { ImportantInformation } from "./custom_components/pages/ImportantInformation";
import { FAQ } from "./custom_components/pages/FAQ";
import { SignUp } from "./custom_components/pages/SignUp/SignUp";
import { Sustainability } from "./custom_components/pages/Sustainability";
import { TermsAndConditions } from "./custom_components/pages/TermsAndConditions";
import ScrollToTop from "./custom_components/molecules/ScrollToTop";
import {ContactUsPage} from "@/custom_components/pages/ContactUs.jsx";


export const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
        <ContentWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/important-information"
              element={<ImportantInformation />}
            />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="/faq" element={<FAQ />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
          </Routes>
        </ContentWrapper>
        <Footer />
      </div>
    </Router>
  );
};
