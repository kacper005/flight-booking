import React from "react";
import { RouteLink } from "../atoms/RouteLink";

export const Footer = () => {
  return (
    <footer style={{ marginTop: "auto" }}>
      <nav
        style={{
          backgroundColor: "var(--mainColor)",
          color: "var(--textColor)",
          padding: "20px 40px",
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          gap: "50px",
        }}
      >
        <div
          style={{ display: "grid", alignItems: "center", lineHeight: "1.5" }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>About us</p>
          <span style={{ marginTop: "10px" }} />
          <RouteLink to="/about-us" margin={0} textDecoration="underline">
            About us
          </RouteLink>
          <RouteLink
            to="/important-information"
            margin={0}
            textDecoration="underline"
          >
            Important information
          </RouteLink>
          <RouteLink to="/sustainability" margin={0} textDecoration="underline">
            Sustainability
          </RouteLink>
          <span style={{ marginBottom: "10px" }} />

          <a
            href="https://github.com/kacper005/flight-booking"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="../src/assets/logos/github-mark-white.svg"
              alt="Github logo"
              width="50px"
            />
          </a>
        </div>
        <div
          style={{ display: "grid", alignItems: "center", lineHeight: "1.5" }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Support</p>
          <span style={{ marginTop: "10px" }} />
          <RouteLink to="/contactus" margin={0} textDecoration="underline">
            Contact us
          </RouteLink>
          <RouteLink to="/faq" margin={0} textDecoration="underline">
            FAQ
          </RouteLink>
          <RouteLink to="/airline-information" margin={0} textDecoration="underline">
            Airline information
          </RouteLink>
          <RouteLink
            to="/terms-and-conditions"
            margin={0}
            textDecoration="underline"
          >
            Terms and conditions
          </RouteLink>
        </div>
        <div
          style={{ display: "grid", alignItems: "center", lineHeight: "1.5" }}
        >
          <p style={{ fontWeight: "bold", marginBottom: "0px" }}>Log in</p>
          <span style={{ marginTop: "10px" }} />
          <RouteLink to="/sign-in" margin={0} textDecoration="underline">
            Log in
          </RouteLink>
          <RouteLink to="/sign-up" margin={0} textDecoration="underline">
            Register
          </RouteLink>
          <RouteLink to="/#" margin={0} textDecoration="underline">
            My bookings
          </RouteLink>
        </div>
      </nav>

      <div
        style={{
          backgroundColor: "#3D52A0",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontStyle: "italic",
            fontSize: "14px",
            color: "var(--textColor)",
            maxWidth: "650px",
            margin: "auto",
          }}
        >
          This website is a result of a university group project, performed in
          the course{" "}
          <a
            style={{ textDecoration: "underline", color: "var(--textColor)" }}
            href={"https://www.ntnu.edu/studies/courses/IDATA2301#tab=omEmnet"}
            target="_blank"
            rel="noopener noreferrer"
          >
            IDATA2301 Web technologies
          </a>
          , at{" "}
          <a
            style={{ textDecoration: "underline", color: "var(--textColor)" }}
            href={"https://www.ntnu.edu/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            NTNU
          </a>
          . All the information provided here is a result of imagination. Any
          resemblance with real companies or products is a coincidence.
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#3D52A0",
          color: "white",
          textAlign: "center",
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <img
          src="../src/assets/logos/visa-white-mark.svg"
          alt="Visa logo"
          width="100px"
        />
        <img
          src="../src/assets/logos/mastercard-mark.svg"
          alt="Mastercard logo"
          width="75px"
        />
        <img
          src="../src/assets/logos/applepay-mark.svg"
          alt="Apple Pay logo"
          width="55px"
        />
        <img
          src="../src/assets/logos/googlepay-mark.svg"
          alt="Google Pay logo"
          width="68px"
        />
      </div>
    </footer>
  );
};
