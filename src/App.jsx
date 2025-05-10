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
import { Sustainability } from "@pages/Sustainability";
import { AdminUsers } from "@pages/Admin/AdminUsers.jsx";
import { AdminFlights } from "@pages/Admin/AdminFlights.jsx";
import { AdminFeedback } from "@pages/Admin/AdminFeedback.jsx";
import { AdminAirports } from "@pages/Admin/AdminAirports.jsx";
import { AdminAirlines } from "@pages/Admin/AdminAirlines.jsx";
import { AdminBookings } from "@pages/Admin/AdminBookings.jsx";
import { AirlineInformation } from "@pages/AirlineInformation";
import { TermsAndConditions } from "@pages/TermsAndConditions";
import { SearchResults } from "@pages/SearchResult/SearchResults";
import { ImportantInformation } from "@pages/ImportantInformation";
import { SearchResultDetails } from "@pages/SearchResult/SearchResultDetails";
import { overwriteCountries } from "@/formatters/FormatCountries.js";

import { ToastContainer } from "react-toastify";

import AdminRoute from "@atoms/AdminRoute";
import ProtectedRoute from "@atoms/ProtectedRoute";
import { Header } from "@organisms/Header/Header";
import { Footer } from "@organisms/Footer.jsx";
import { Navbar } from "@organisms/Navbar/Navbar";
import { useAuth } from "@context/AuthContext";
import ScrollToTop from "@hooks/ScrollToTop";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const { isLoggedIn } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  React.useEffect(() => {
    overwriteCountries();
  }, []);

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
              <Route path="airlines" element={<AdminAirlines />} />
              <Route path="airports" element={<AdminAirports />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="feedback" element={<AdminFeedback />} />
            </Route>
          </Route>
        </Routes>
        <ToastContainer />
        <Footer />
      </div>
    </Router>
  );
};
