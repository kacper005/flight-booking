import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FAQ } from "@pages/FAQ";
import { Home } from "@pages/Home";
import { AboutUs } from "@pages/AboutUs";
import { SignIn } from "@pages/SignIn/SignIn";
import { SignUp } from "@pages/SignUp/SignUp";
import { Admin } from "@pages/Admin/Admin.jsx";
import { SavedTrips } from "@pages/SavedTrips";
import { ContactUsPage } from "@pages/ContactUs";
import { UserProfile } from "@pages/UserProfile";
import { NotFound } from "@pages/NotFound/NotFound";
import { SearchResults } from "@pages/SearchResults";
import { Sustainability } from "@pages/Sustainability";
import { AdminUsers } from "@pages/Admin/AdminUsers.jsx";
import { AdminFlights } from "@pages/Admin/AdminFlights.jsx";
import { AirlineInformation } from "@pages/AirlineInformation";
import { TermsAndConditions } from "@pages/TermsAndConditions";
import { SearchResultDetails } from "@pages/SearchResultDetails";
import { ImportantInformation } from "@pages/ImportantInformation";

import { ToastContainer } from "react-toastify";

import AdminRoute from "@atoms/AdminRoute";
import ScrollToTop from "@atoms/ScrollToTop";
import ProtectedRoute from "@atoms/ProtectedRoute";
import { Header } from "@organisms/Header/Header";
import { Footer } from "@organisms/Footer.jsx";
import { Navbar } from "@organisms/Navbar/Navbar";
import { useAuth } from "@context/AuthContext";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { isLoggedIn } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Header toggleSidebar={toggleSidebar} />
        <Navbar
          key={isLoggedIn ? "auth-true" : "auth-false"}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
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
          <Route
            path="/search-results-details"
            element={<SearchResultDetails />}
          />
          <Route path="/not-found" element={<NotFound />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/saved-trips" element={<SavedTrips />} />

            <Route path="/admin" element={<AdminRoute />}>
              <Route index element={<Admin />} />
              <Route path="flights" element={<AdminFlights />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};
