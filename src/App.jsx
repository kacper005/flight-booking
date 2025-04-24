import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FAQ } from "@pages/FAQ";
import { Home } from "@pages/Home";
import { SignIn } from "@pages/SignIn";
import { AboutUs } from "@pages/AboutUs";
import { SignUp } from "@pages/SignUp/SignUp";
import { ContactUsPage } from "@pages/ContactUs";
import { SearchResults } from "@pages/SearchResults";
import { Sustainability } from "@pages/Sustainability";
import { AirlineInformation } from "@pages/AirlineInformation";
import { TermsAndConditions } from "@pages/TermsAndConditions";
import { ImportantInformation } from "@pages/ImportantInformation";
import { Admin } from "@pages/Admin/Admin.jsx";
import { AdminFlights } from "@pages/Admin/AdminFlights.jsx";

import { Header } from "@organisms/Header/Header";
import { Footer } from "@organisms/Footer.jsx";
import ScrollToTop from "@molecules/ScrollToTop";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header />
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
          <Route path="/airline-information" element={<AirlineInformation />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-flights" element={<AdminFlights />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};
